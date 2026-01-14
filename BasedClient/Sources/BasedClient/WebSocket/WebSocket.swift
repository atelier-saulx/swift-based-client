//
//  WebSocketClient.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 18/11/2025.
//

import Foundation
import JavaScriptCore


protocol WebSocketProviding: Sendable {
    func addEventListener(type: String, callback: JSValue) async
    func removeEventListener(type: String, callback: JSValue) async
    func connect() async
    func disconnect(code: URLSessionWebSocketTask.CloseCode, reason: String?) async
    func send(text: String) async throws
    func send(data: Data) async throws
    func currentState() async -> WebSocketState
    func isConnected() async -> Bool
}

/// WebSocket event types
enum WebSocketEvent: Sendable {
    case connected
    case disconnected(code: URLSessionWebSocketTask.CloseCode, reason: String?)
    case text(String)
    case data(Data)
    case error(Error)
}

/// WebSocket state
enum WebSocketState: Sendable {
    case disconnected
    case connecting
    case connected
    case disconnecting
}

/// Thread-safe WebSocket wrapper using actor
actor WebSocket: NSObject, URLSessionWebSocketDelegate, WebSocketProviding {
    
    // MARK: - Custom Executor
    
    private let queue: DispatchSerialQueue
    
    nonisolated var unownedExecutor: UnownedSerialExecutor {
        queue.asUnownedSerialExecutor()
    }
    
    // MARK: - Properties
    
    private var webSocketTask: URLSessionWebSocketTask?
    private let url: URL
    private let session: URLSession
    private var protocols: JSValue?
    private var shouldPing = false
    private let pingInterval: TimeInterval = 30.0

    private(set) var state: WebSocketState = .disconnected    
    private var jsListeners: [String: [JSValue]] = [:]
    private weak var jsContext: JSContext?
    
    
    // MARK: - Initialization
    
    private init?(url: URL,
          protocols: JSValue? = nil,
          jsContext: JSContext?,
          queue: DispatchSerialQueue,
          configuration: URLSessionConfiguration = .default) {
        self.url = url
        self.protocols = protocols
        self.jsContext = jsContext
        self.queue = queue
        self.session = URLSession(configuration: configuration)
    }
    
    static func create(
        urlString: String,
        protocols: JSValue? = nil,
        jsContext: JSContext?,
        queueLabel: String = "com.websocket.queue",
        configuration: URLSessionConfiguration = .default
    ) -> WebSocket? {
        guard let url = URL(string: urlString) else { return nil }
        
        let queue = DispatchSerialQueue(label: queueLabel)
        
        let ws = queue.sync {
            WebSocket(
                url: url,
                protocols: protocols,
                jsContext: jsContext,
                queue: queue,
                configuration: configuration
            )
        }
        
        return ws
    }
    
    deinit {
        print("Webseocket deinitialized")
    }
    
    // MARK: - Event Handler Registration
    
    func addEventListener(type: String, callback: JSValue) {
        print("Storing listener for '\(type)' on queue: \(queue.label)")
        if jsListeners[type] == nil {
            jsListeners[type] = []
        }
        jsListeners[type]?.append(callback)
    }
    
    func removeEventListener(type: String, callback: JSValue) {
        jsListeners[type]?.removeAll { $0 == callback }
    }
    
    func removeAllListeners(type: String? = nil) {
        if let type = type {
            jsListeners.removeValue(forKey: type)
        } else {
            jsListeners.removeAll()
        }
    }
    
    private func triggerJSEvent(type: String, eventData: JSValue? = nil) {
        guard let callbacks = jsListeners[type], !callbacks.isEmpty else {
            return
        }
        
        print("Triggering '\(type)' event (\(callbacks.count) listeners)")
        
        for callback in callbacks {
            if let eventData = eventData {
                callback.call(withArguments: [eventData])
            } else {
                callback.call(withArguments: [])
            }
        }

    }

    // MARK: - Connection Management
    
    func connect() async {
        guard state == .disconnected else {
            print("WebSocket already connected or connecting")
            return
        }
        
        state = .connecting
        
        self.webSocketTask?.delegate = self
        
        var request = URLRequest(url: url)
        request.timeoutInterval = 30
        
        if let protocols = protocols, protocols.isArray {
            request.setValue(protocols.toString(),
                             forHTTPHeaderField: "Sec-WebSocket-Protocol")
        } else if let protocols, let _ = protocols.toArray() {
            fatalError("Not able to connect")
        }
        
        webSocketTask = session.webSocketTask(with: request)
        webSocketTask?.resume()
        
        state = .connected
        
        triggerJSEvent(type: "open", eventData: nil)

        startPingLoop()
        
        await receiveMessage()
    }
    
    func disconnect(code: URLSessionWebSocketTask.CloseCode = .normalClosure, reason: String? = nil) async {
        guard state == .connected || state == .connecting else { return }
        
        state = .disconnecting
        
        startPingLoop()
        
        let reasonData = reason?.data(using: .utf8)
        webSocketTask?.cancel(with: code, reason: reasonData)
        webSocketTask = nil
        
        state = .disconnected
        
        triggerJSEvent(type: "close", eventData: nil)
        
        jsListeners.removeAll()
    }
    
    // MARK: - Sending Messages
    
    func send(text: String) async throws {
        guard state == .connected, let task = webSocketTask else {
            throw WebSocketError.notConnected
        }
        
        let message = URLSessionWebSocketTask.Message.string(text)
        try await task.send(message)
    }
    
    func send(data: Data) async throws {
        
        guard state == .connected, let task = webSocketTask else {
            throw WebSocketError.notConnected
        }
        
        let message = URLSessionWebSocketTask.Message.data(data)
        try await task.send(message)
    }
    
    // MARK: - Receiving Messages
    
    private func receiveMessage() async {
        
        guard state == .connected, let task = webSocketTask else {
            print("[receiveMessage] Loop stopped - not connected")
            return
        }
        
        do {
            print("[receiveMessage] Waiting for message...")
            
            switch try await task.receive() {
            case let .data(data):
                
                if let uint8Array = createJSUint8Array(from: data) {
                    let event = jsContext?.evaluateScript("""
                    (function(uint8Array) {
                        
                        const event = {
                            type: 'message',
                            data: uint8Array
                        };
                        
                        console.log('[Event Creation] event.data instanceof Uint8Array:', event.data instanceof Uint8Array);
                        
                        return event;
                    })
                """)?.call(withArguments: [uint8Array])
                    triggerJSEvent(type: "message", eventData: event)
                }
            case let .string(text):
                let jsString = JSValue(object: text, in: jsContext)
                triggerJSEvent(type: "message", eventData: jsString)
            @unknown default:
                print("[receiveMessage] Unknown message type")
                startPingLoop()
            }
            
            print(" [receiveMessage] Continuing loop...")
            
            await receiveMessage()
            
        } catch {
            print("[receiveMessage] Error: \(error)")
            
            if let urlError = error as? URLError,
               urlError.code == .timedOut,
               state == .connected {
                
                print("Timeout - retrying once...")
                try? await Task.sleep(for: .seconds(1))
                await receiveMessage()
                
            } else {
                
                if state == .connected {
                    state = .disconnected
                    triggerJSEvent(type: "close", eventData: nil)
                }
            }
        }
        
    }
    
    private func createJSUint8Array(from data: Data) -> JSValue? {
        guard let context = jsContext else { return nil }
        
        let bytes = [UInt8](data)
        
        if bytes.isEmpty {
            return context.evaluateScript("new Uint8Array(0)")
        }
        
        // For small data
        if bytes.count < 10_000 {
            let bytesString = bytes.map { String($0) }.joined(separator: ",")
            return context.evaluateScript("new Uint8Array([\(bytesString)])")
        }
        
        context.evaluateScript("var __temp = new Uint8Array(\(bytes.count));")
        
        let chunkSize = 5000
        var offset = 0
        
        while offset < bytes.count {
            let end = min(offset + chunkSize, bytes.count)
            let chunk = Array(bytes[offset..<end])
            let chunkString = chunk.map { String($0) }.joined(separator: ",")
            
            context.evaluateScript("""
            (function() {
                const chunk = [\(chunkString)];
                for (let i = 0; i < chunk.length; i++) {
                    __temp[\(offset) + i] = chunk[i];
                }
            })();
        """)
            
            offset = end
        }
        
        let result = context.evaluateScript("__temp")
        context.evaluateScript("delete globalThis.__temp;")
        
        return result
    }
    
    // MARK: - State Access
    
    func currentState() -> WebSocketState {
        return state
    }
    
    func isConnected() -> Bool {
        return state == .connected
    }
    
    // MARK: -
    
    @nonobjc func urlSession(_ session: URLSession, webSocketTask: URLSessionWebSocketTask, didOpenWithProtocol protocol: String?) {
        print(session)
    }
    
    @nonobjc func urlSession(_ session: URLSession, webSocketTask: URLSessionWebSocketTask, didCloseWith closeCode: URLSessionWebSocketTask.CloseCode, reason: Data?) {
        print(session)
    }
}

// MARK: - Errors

enum WebSocketError: Error, LocalizedError, Sendable, Equatable {
    case notConnected
    case invalidURL
    
    var errorDescription: String? {
        switch self {
        case .notConnected:
            return "WebSocket is not connected"
        case .invalidURL:
            return "Invalid WebSocket URL"
        }
    }
}

// MARK: - Convenience Extensions

extension WebSocket {
    
    func startPingLoop() {
        shouldPing = true
        Task {
            await runPingLoop()
        }
    }
    
    private func runPingLoop() async {
        
        while shouldPing {
            guard let task = webSocketTask else {
                print("No websocket task")
                break
            }
            
            let success = await withCheckedContinuation { continuation in
                print("Sending ping at \(Date()) \(Thread.current)")
                
                task.sendPing { error in
                    if let error = error {
                        print("✗ Ping failed: \(error) \(Thread.current)")
                        continuation.resume(returning: false)
                    } else {
                        print("✓ Pong received at \(Date()) \(Thread.current)")
                        continuation.resume(returning: true)
                    }
                }
            }
            
            if !success {
                break
            }
            
            do {
                try await Task.sleep(nanoseconds: UInt64(pingInterval * 1_000_000_000))
            } catch {
                break
            }
        }
    }
    
}

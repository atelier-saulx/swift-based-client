//
//  BasedBridge.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 29/10/2025.
//

import Foundation
import JavaScriptCore


extension JSContext: @unchecked @retroactive Sendable {}
extension JSValue: @unchecked @retroactive Sendable {}

protocol BasedBridgeProtocol: Sendable {
    func executeCall(functionName: String, jsonPayload: String?) async throws -> Data
    func executeQuery(functionName: String, jsonPayload: String?) async throws -> Data
    func authState() async throws -> String?
    func setAuthState(state: String) async throws
    func queryStream<Response: Decodable & Sendable>(
        _ functionName: String,
        payload: Data
    ) async throws -> AsyncThrowingStream<Response, Error>
}

actor BasedBridge: BasedBridgeProtocol {
    
    // MARK: - private members
    
    private let queue: QueueProviding
    private let instanceId: String
    private let context: JSContextProviding
    private let bundle: BundleProviding
    private let webSocketFactory: WebSocketFactoryProviding
    private var webSocket: WebSocket?
    
    
    // MARK: - Internal members
    
    nonisolated let unownedExecutor: UnownedSerialExecutor
    
    static let timerIdCounter = AtomicCounter()
    
    var timers: [Int: Task<Void, Never>] = [:]
    
    func getContext() -> JSContext {
        context.getContext()
    }
    
    func storeWebSocket(_ ws: WebSocket) {
        self.webSocket = ws
    }
    
    func getWebSocket() -> WebSocket? {
        return self.webSocket
    }
    
    
    // MARK: - Initialization
    
    init(
        queue: QueueProviding,
        context: JSContextProviding,
        bundle: BundleProviding,
        webSocketFactory: WebSocketFactoryProviding = DefaultWebSocketFactory(),
        instanceId: String
    ) {
        self.queue = queue
        self.context = context
        self.instanceId = instanceId
        self.bundle = bundle
        self.webSocketFactory = webSocketFactory
        self.unownedExecutor = queue.unownedSerialExecutor
    }
    
    static func create(basedOpts: BasedOpts) async throws -> BasedBridge {
        let instanceId = UUID().uuidString
        let name = "com.app.based.jscore.\(instanceId)"
        let queue = DispatchSerialQueueWrapper(label: name)
        let context = queue.sync {
            let wrapper = JSContextWrapper()
            wrapper.setExceptionHandler { [name, instanceId] context, exception in
                print("[\(name)#\(instanceId)] JS Error: \(exception?.toString() ?? "unknown")")
            }
            return wrapper
        }
        let bridge = BasedBridge(
            queue: queue,
            context: context,
            bundle: BundleWrapper(),
            webSocketFactory: DefaultWebSocketFactory(),
            instanceId: instanceId
        )
        try await bridge.setup()
        
        _ = queue.sync {
            context.evaluateScript(basedOpts.jsValue)
        }
        return bridge
    }
    
    // MARK: - Setup
    
    func setup() throws {
        setupPolyfills()
        
        guard let bundleURL = bundle.url(forResource: "based-client", withExtension: "js"),
              let jsCode = try? String(contentsOf: bundleURL, encoding: .utf8) else {
            throw BasedError.bundleNotFound
        }
        
        _ = context.evaluateScript(jsCode)
        
        guard context.objectForKeyedSubscript("Based")?.isUndefined == false else {
            throw BasedError.clientNotFound
        }
    }
    
    // MARK: - Internal API
    
    // Get current auth state from JavaScript client
    func authState() async throws -> String? {
            let script = """
            (function() {
                try {
                    const authState = basedClient.authState;
                    console.log('[Based] Current auth state:', authState);
                    
                    if (authState === null || authState === undefined) {
                        return { success: true, data: null };
                    }
                    
                    return { success: true, data: authState };
                } catch (error) {
                    console.error('[Based] Failed to get auth state:', error.message);
                    return { success: false, error: error.message || String(error) };
                }
            })()
        """
        
        guard let result = context.evaluateScript(script) else {
            throw BasedError.callFailed
        }
        
        let success = result.objectForKeyedSubscript("success")?.toBool() ?? false
        
        guard success else {
            let errorMessage = result.objectForKeyedSubscript("error")?.toString() ?? "Unknown error"
            throw BasedError.jsError(errorMessage)
        }
        
        // Check if data is null
        guard let data = result.objectForKeyedSubscript("data"), !data.isNull, !data.isUndefined else {
            return nil
        }
        
        // Stringify the auth state object
        guard let stringifyFunc = context.evaluateScript("JSON.stringify"),
              let jsonString = stringifyFunc.call(withArguments: [data])?.toString() else {
            throw BasedError.resultSerializationFailed
        }
        
        return jsonString
    }
    
    func setAuthState(state: String) async throws {
        print(state.escapedJSON)
        let script = """
            (async function() {
                try {                    
                    console.log("lets auth now")
                    const payload = JSON.parse('\(state.escapedJSON)');
                    console.log(payload)
                    await basedClient.setAuthState(payload)
                    console.log('[Based Auth Success]');
                    return { success: true };
                } catch (error) {
                    console.log('So auth is failing....')
                    console.error(error.message);
                    return { success: false, error: error.message || String(error) };
                }
            })()
            """
        
        guard let promise = context.evaluateScript(script) else {
            throw BasedError.callFailed
        }
        
        try await withPromiseVoid(promise)
    }
    
    func executeCall(
        functionName: String,
        jsonPayload: String?
    ) async throws -> Data {
        
        let escapedFunctionName = functionName.replacingOccurrences(of: "'", with: "\\'")
        
        let script: String
        if let jsonPayload {
            script = """
        (async function() {
            try {
                const payload = JSON.parse('\(jsonPayload.escapedJSON)');
                console.log('[Based Call] \(escapedFunctionName)', payload);
                const result = await basedClient.call('\(escapedFunctionName)', payload);
                console.log('[Based Success]');
                return { success: true, data: result };
            } catch (error) {
                console.error(error.message);
                return { success: false, error: error.message || String(error) };
            }
        })()
        """
        } else {
            script = """
        (async function() {
            try {
                console.log('[Based Call] \(escapedFunctionName) (no payload)');
                const result = await basedClient.call('\(escapedFunctionName)');
                console.log('[Based Success]');
                return { success: true, data: result };
            } catch (error) {
                console.error(error.message);
                return { success: false, error: error.message || String(error) };
            }
        })()
        """
        }
        
        guard let promise = context.evaluateScript(script) else {
            throw BasedError.callFailed
        }
        
        return try await withPromise(promise)
    }
    
    func executeQuery(
        functionName: String,
        jsonPayload: String?
    ) async throws -> Data {
        
        let escapedFunctionName = functionName.replacingOccurrences(of: "'", with: "\\'")
        
        let script: String
        if let jsonPayload {
            script = """
        (async function() {
            try {
                const payload = JSON.parse('\(jsonPayload.escapedJSON)');
                console.log('[Based Query] \(escapedFunctionName)', payload);
                const query = basedClient.query('\(escapedFunctionName)', payload);
                console.log('[Based Query] Query object created');
                const result = await query.get();
                console.log('[Based Query Success]');
                return { success: true, data: result };
            } catch (error) {
                console.error(error.message);
                return { success: false, error: error.message || String(error) };
            }
        })()
        """
        } else {
            script = """
        (async function() {
            try {
                console.log('[Based Query] \(escapedFunctionName) (no payload)');
                const query = basedClient.query('\(escapedFunctionName)');
                console.log('[Based Query] Query object created');
                console.log('[Based Query] Client calculated ID:', query.id);
                const result = await query.get();
                console.log('[Based Query Success]');
                return { success: true, data: result };
            } catch (error) {
                console.error(error.message);
                return { success: false, error: error.message || String(error) };
            }
        })()
        """
        }
        
        guard let promise = context.evaluateScript(script) else {
            throw BasedError.callFailed
        }
        
        return try await withPromise(promise)
    }
    
    // MARK: - Private helpers
    
    private func setupPolyfills() {
        let context = self.context.getContext()
        addConsole(with: context)
        addGlobal(with: context)
        addBlobPolyfill(with: context)
        addTextEncoderDecoder(with: context)
        addFetch(with: context)
        addTimers(with: context)
        addLocalStorage(with: context)
        addWebSocket(with: context, and: webSocketFactory)
    }
    
    private func withPromise(_ promise: JSValue) async throws -> Data {
        try await withCheckedThrowingContinuation { continuation in
            
            let thenCallback: @convention(block) (JSValue) -> Void = { wrapper in
                
                let success = wrapper.objectForKeyedSubscript("success")?.toBool() ?? false
                
                if success {
                    guard let data = wrapper.objectForKeyedSubscript("data"),
                          let stringifyFunc = wrapper.context?.evaluateScript("JSON.stringify"),
                          let jsonString = stringifyFunc.call(withArguments: [data])?.toString(),
                          let jsonData = jsonString.data(using: .utf8) else {
                        continuation.resume(throwing: BasedError.resultSerializationFailed)
                        return
                    }
                    continuation.resume(returning: jsonData)
                } else {
                    let errorMessage = wrapper.objectForKeyedSubscript("error")?.toString() ?? "Unknown error"
                    continuation.resume(throwing: BasedError.jsError(errorMessage))
                }
            }
            
            let catchCallback: @convention(block) (JSValue) -> Void = { error in
                continuation.resume(throwing: BasedError.jsError(error.toString() ?? "Unknown error"))
            }
            
            promise.invokeMethod("then", withArguments: [
                JSValue(object: thenCallback, in: promise.context)!
            ])?.invokeMethod("catch", withArguments: [
                JSValue(object: catchCallback, in: promise.context)!
            ])
        }
    }
    
    private func withPromiseVoid(_ promise: JSValue) async throws {
        try await withCheckedThrowingContinuation { (continuation: CheckedContinuation<Void, Error>) in
            
            let thenCallback: @convention(block) (JSValue) -> Void = { wrapper in
                let success = wrapper.objectForKeyedSubscript("success")?.toBool() ?? false
                
                if success {
                    print("Operation succeeded")
                    continuation.resume()
                } else {
                    let errorMessage = wrapper.objectForKeyedSubscript("error")?.toString() ?? "Unknown error"
                    print("Operation failed:", errorMessage)
                    continuation.resume(throwing: BasedError.jsError(errorMessage))
                }
            }
            
            let catchCallback: @convention(block) (JSValue) -> Void = { error in
                let errorMessage = error.toString() ?? "Unknown error"
                print("Promise rejected:", errorMessage)
                continuation.resume(throwing: BasedError.jsError(errorMessage))
            }
            
            promise.invokeMethod("then", withArguments: [
                JSValue(object: thenCallback, in: promise.context)!
            ])?.invokeMethod("catch", withArguments: [
                JSValue(object: catchCallback, in: promise.context)!
            ])
        }
    }
}

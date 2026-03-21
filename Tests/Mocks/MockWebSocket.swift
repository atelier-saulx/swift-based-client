//
//  MockWebSocket.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 02/01/2026.
//

import Foundation
import JavaScriptCore
@testable import BasedClient


actor MockWebSocket: WebSocketProviding {
    var state: WebSocketState = .disconnected
    var listeners: [String: [JSValue]] = [:]
    var connectCalled = false
    var disconnectCalled = false
    var sendTextCalled: [String] = []
    var sendDataCalled: [Data] = []
    
    func addEventListener(type: String, callback: JSValue) {
        if listeners[type] == nil {
            listeners[type] = []
        }
        listeners[type]?.append(callback)
    }
    
    func removeEventListener(type: String, callback: JSValue) {
        listeners[type]?.removeAll { $0 == callback }
    }
    
    func connect() {
        connectCalled = true
        state = .connected
    }
    
    func disconnect(code: URLSessionWebSocketTask.CloseCode = .normalClosure, reason: String? = nil) {
        disconnectCalled = true
        state = .disconnected
    }
    
    func send(text: String) throws {
        sendTextCalled.append(text)
    }
    
    func send(data: Data) throws {
        sendDataCalled.append(data)
    }
    
    func currentState() -> WebSocketState {
        return state
    }
    
    func isConnected() -> Bool {
        return state == .connected
    }
}

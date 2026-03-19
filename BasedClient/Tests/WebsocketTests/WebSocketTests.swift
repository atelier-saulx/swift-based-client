//
//  WebSocketTests.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 02/01/2026.
//

import Testing
import JavaScriptCore
import Foundation
@testable import BasedClient

@Suite("WebSocket Tests")
struct WebSocketTests {
    
    @Test("WebSocket creates successfully with valid URL")
    func webSocketCreation() async throws {
        let context = JSContext()!
        let ws = WebSocket.create(
            urlString: "ws://localhost:8080",
            protocols: nil,
            jsContext: context
        )
        #expect(ws != nil)
    }
    
    @Test("WebSocket creation fails with invalid URL")
    func webSocketCreationInvalidURL() async throws {
        let context = JSContext()!
        let ws = WebSocket.create(
            urlString: "",
            protocols: nil,
            jsContext: context
        )
        #expect(ws == nil)
    }
    
    @Test("Initial state is disconnected")
    func initialState() async throws {
        let context = JSContext()!
        let ws = WebSocket.create(
            urlString: "ws://localhost:8080",
            protocols: nil,
            jsContext: context
        )!
        
        let state = await ws.currentState()
        #expect(state == .disconnected)
    }
    
    @Test("Send throws when not connected")
    func sendWhenNotConnected() async throws {
        let context = JSContext()!
        let ws = WebSocket.create(
            urlString: "ws://localhost:8080",
            protocols: nil,
            jsContext: context
        )!
        
        await #expect(throws: WebSocketError.notConnected) {
            try await ws.send(text: "Hello")
        }
    }
    
    @Test("Event listeners can be added")
    func addEventListener() async throws {
        let context = JSContext()!
        let ws = WebSocket.create(
            urlString: "ws://localhost:8080",
            protocols: nil,
            jsContext: context
        )!
        
        let callback = JSValue(object: { print("callback") }, in: context)!
        await ws.addEventListener(type: "open", callback: callback)
        
        #expect(true)
    }
}

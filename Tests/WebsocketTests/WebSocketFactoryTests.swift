//
//  WebSocketFactoryTests.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 02/01/2026.
//

import Testing
import JavaScriptCore
@testable import BasedClient

@Suite("WebSocket Factory Tests")
struct WebSocketFactoryTests {
    
    // MARK: - DefaultWebSocketFactory Tests
    
    @Test("DefaultWebSocketFactory creates WebSocket with valid URL")
    func defaultFactoryCreatesWebSocket() async throws {
        let factory = DefaultWebSocketFactory()
        let context = JSContext()!
        
        let ws = factory.create(
            urlString: "ws://localhost:8080",
            protocols: nil,
            jsContext: context
        )
        
        #expect(ws != nil)
        
        let state = await ws?.currentState()
        #expect(state == .disconnected)
    }
    
    @Test("DefaultWebSocketFactory returns nil for invalid URL")
    func defaultFactoryInvalidURL() async throws {
        let factory = DefaultWebSocketFactory()
        let context = JSContext()!
        
        let ws = factory.create(
            urlString: "",
            protocols: nil,
            jsContext: context
        )
        
        #expect(ws == nil)
    }
    
    @Test(
        "DefaultWebSocketFactory creates with various URLs",
        arguments: [
            "ws://example.com",
            "wss://example.com",
            "ws://localhost:3000",
            "wss://secure.example.com:443/path"
        ]
    )
    func defaultFactoryVariousURLs(urlString: String) async throws {
        let factory = DefaultWebSocketFactory()
        let context = JSContext()!
        
        let ws = factory.create(
            urlString: urlString,
            protocols: nil,
            jsContext: context
        )
        
        #expect(ws != nil)
    }
    
    @Test("DefaultWebSocketFactory is Sendable")
    func defaultFactoryIsSendable() {
        let factory: any Sendable = DefaultWebSocketFactory()
        #expect(factory is WebSocketFactoryProviding)
    }
    
    @Test("Multiple factories can be created")
    func multipleFactories() async throws {
        let factory1 = DefaultWebSocketFactory()
        let factory2 = DefaultWebSocketFactory()
        
        let context = JSContext()!
        
        let ws1 = factory1.create(
            urlString: "ws://localhost:8080",
            protocols: nil,
            jsContext: context
        )
        
        let ws2 = factory2.create(
            urlString: "ws://localhost:8081",
            protocols: nil,
            jsContext: context
        )
        
        #expect(ws1 != nil)
        #expect(ws2 != nil)
    }
}

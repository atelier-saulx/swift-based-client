//
//  MockWebSocketFactory.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 02/01/2026.
//

import JavaScriptCore
@testable import BasedClient


struct MockWebSocketFactory: WebSocketFactoryProviding {
    let mockWebSocket: WebSocket?
    
    func create(
        urlString: String,
        protocols: JSValue?,
        jsContext: JSContext
    ) -> WebSocket? {
        return mockWebSocket
    }
}

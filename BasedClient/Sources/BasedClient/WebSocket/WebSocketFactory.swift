//
//  WebSocketFactory.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 02/01/2026.
//

import JavaScriptCore


protocol WebSocketFactoryProviding: Sendable {
    func create(
        urlString: String,
        protocols: JSValue?,
        jsContext: JSContext
    ) -> WebSocket?
}

struct DefaultWebSocketFactory: WebSocketFactoryProviding {
    func create(
        urlString: String,
        protocols: JSValue?,
        jsContext: JSContext
    ) -> WebSocket? {
        return WebSocket.create(
            urlString: urlString,
            protocols: protocols,
            jsContext: jsContext
        )
    }
}

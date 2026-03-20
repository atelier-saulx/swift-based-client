//
//  JSContextWrapper.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 30/12/2025.
//

import JavaScriptCore


protocol JSContextProviding {
    func evaluateScript(_ script: String) -> JSValue?
    func objectForKeyedSubscript(_ key: String) -> JSValue?
    func setExceptionHandler(_ handler: @escaping (JSContext?, JSValue?) -> Void)
    func getContext() -> JSContext
}

final class JSContextWrapper: JSContextProviding, Sendable {
    private let context: JSContext
    
    init() {
        self.context = JSContext()!
    }
    
    func getContext() -> JSContext {
        context
    }
    
    func evaluateScript(_ script: String) -> JSValue? {
        context.evaluateScript(script)
    }
    
    func objectForKeyedSubscript(_ key: String) -> JSValue? {
        context.objectForKeyedSubscript(key)
    }
    
    func setExceptionHandler(_ handler: @escaping (JSContext?, JSValue?) -> Void) {
        context.exceptionHandler = handler
    }
}

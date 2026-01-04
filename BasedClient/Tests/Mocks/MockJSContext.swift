//
//  MockJSContext.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 30/12/2025.
//

import JavaScriptCore
@testable import BasedClient


final class MockJSContext: JSContextProviding, @unchecked Sendable {
    var scriptEvaluations: [String] = []
    var mockValues: [String: JSValue] = [:]
    var exceptionHandler: ((JSContext?, JSValue?) -> Void)?
    var nextEvaluation: JSValue?
    
    private let realContext = JSContext()!
    
    func getContext() -> JSContext {
        realContext
    }
    
    func evaluateScript(_ script: String) -> JSValue? {
        scriptEvaluations.append(script)
        return nextEvaluation ?? mockValues[script]
    }
    
    func objectForKeyedSubscript(_ key: String) -> JSValue? {
        mockValues[key]
    }
    
    func setExceptionHandler(_ handler: @escaping (JSContext?, JSValue?) -> Void) {
        exceptionHandler = handler
    }
}

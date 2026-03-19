//
//  MockHelpers.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 30/12/2025.
//

import JavaScriptCore


enum MockJSValue {
    
    /// Create a mock success promise response
    static func successPromise(data: [String: Any]) -> JSValue {
        let ctx = JSContext()!
        let jsonString = jsonString(from: data)
        return ctx.evaluateScript("""
            ({
                success: true,
                data: \(jsonString),
                then: function(callback) {
                    callback(this);
                    return this;
                },
                catch: function() {
                    return this;
                }
            })
        """)!
    }
    
    /// Create a mock failure promise response
    static func failurePromise(error: String) -> JSValue {
        let ctx = JSContext()!
        return ctx.evaluateScript("""
            ({
                success: false,
                error: '\(error)',
                then: function(callback) {
                    callback(this);
                    return this;
                },
                catch: function(callback) {
                    callback(new Error('\(error)'));
                    return this;
                }
            })
        """)!
    }
    
    /// Create a mock void success promise
    static func voidSuccessPromise() -> JSValue {
        let ctx = JSContext()!
        return ctx.evaluateScript("""
            ({
                success: true,
                then: function(callback) {
                    callback(this);
                    return this;
                },
                catch: function() {
                    return this;
                }
            })
        """)!
    }
    
    /// Create a mock auth state response
    static func authStateResponse(data: [String: Any]?) -> JSValue {
        let ctx = JSContext()!
        if let data = data {
            let jsonString = jsonString(from: data)
            return ctx.evaluateScript("""
                ({
                    success: true,
                    data: \(jsonString)
                })
            """)!
        } else {
            return ctx.evaluateScript("""
                ({
                    success: true,
                    data: null
                })
            """)!
        }
    }
    
    /// Create a mock JSValue that represents undefined
    static func undefined() -> JSValue {
        let ctx = JSContext()!
        return ctx.evaluateScript("undefined")!
    }
    
    /// Create a mock JSValue representing a Based object
    static func basedObject() -> JSValue {
        let ctx = JSContext()!
        return ctx.evaluateScript("({ version: '1.0.0' })")!
    }
    
    // MARK: - Helpers
    
    private static func jsonString(from dict: [String: Any]) -> String {
        guard let data = try? JSONSerialization.data(withJSONObject: dict),
              let string = String(data: data, encoding: .utf8) else {
            return "{}"
        }
        return string
    }
}

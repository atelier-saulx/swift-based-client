//
//  BasedBridge+Console.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 06/12/2025.
//

import Foundation
import JavaScriptCore


// MARK: - Console

extension BasedBridge {
    
    public enum JSLogLevel: Int, Hashable, Codable, Sendable {
        case trace = 0
        case debug = 1
        case info = 2
        case warn = 3
        case error = 4
    }
    
    func addConsole(with context: JSContext) {
        let log: @convention(block) () -> Void = {
            self.log(level: nil, message: self.formattedArgs())
        }
        let info: @convention(block) () -> Void = {
            self.log(level: .info, message: self.formattedArgs())
        }
        let error: @convention(block) () -> Void = {
            self.log(level: .error, message: self.formattedArgs())
        }
        let warn: @convention(block) () -> Void = {
            self.log(level: .warn, message: self.formattedArgs())
        }
        let trace: @convention(block) () -> Void = {
            self.log(level: .trace, message: self.formattedArgs())
        }
        let debug: @convention(block) () -> Void = {
            self.log(level: .debug, message: self.formattedArgs())
        }
        
        context.objectForKeyedSubscript("console").setObject(log, forKeyedSubscript: "log")
        context.objectForKeyedSubscript("console").setObject(info, forKeyedSubscript: "info")
        context.objectForKeyedSubscript("console").setObject(error, forKeyedSubscript: "error")
        context.objectForKeyedSubscript("console").setObject(warn, forKeyedSubscript: "warn")
        context.objectForKeyedSubscript("console").setObject(trace, forKeyedSubscript: "trace")
        context.objectForKeyedSubscript("console").setObject(debug, forKeyedSubscript: "debug")
    }
    
    // MARK: - Helpers
    
    func log(level: JSLogLevel?, message: String) {
        switch level {
        //TODO: add emoji or color based on severity
        default: print(message)
        }
    }
    
    private func formattedArgs() -> String {
        let args = JSContext.currentArguments().compactMap { ($0 as? JSValue) }
        return args.map { $0.loggableString() }.joined(separator: " ")
    }
}

extension JSValue {
    func loggableString(isNested: Bool = false) -> String {
        if self.isUndefined {
            return "undefined"
        } else if self.isNull {
            return "null"
        } else if self.isString {
            return isNested ? "\"\(String(describing: self.toString()))\"" : self.toString()
        } else if self.isNumber {
            return "\(String(describing: self.toNumber()))"
        } else if self.isBoolean {
            return self.toBool() ? "true" : "false"
        } else if self.isArray || self.isObject {
            guard let result = self.context?.evaluateScript("""
                (function(obj) {
                    const seen = new WeakSet();
                    
                    return JSON.stringify(obj, function(key, value) {
                        if (typeof value === 'object' && value !== null) {
                            if (seen.has(value)) {
                                return '[Circular]';
                            }
                            seen.add(value);
                        }
                        return value;
                    }, 2);
                })
            """)?.call(withArguments: [self])?.toString() else {
                return self.isArray ? "[]" : "{}"
            }
            
            return result
        } else {
            return ""
        }
    }
}

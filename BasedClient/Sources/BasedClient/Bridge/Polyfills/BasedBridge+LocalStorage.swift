//
//  BasedBridge+LocalStorage.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 06/12/2025.
//

import Foundation
import JavaScriptCore


// MARK: - LocalStorage

extension BasedBridge {
    
    func addLocalStorage(with context: JSContext) {
        let storageKey = "BasedBridge.localStorage"
        
        let getItem: @convention(block) (String) -> String? = { key in
            let store = UserDefaults.standard.dictionary(forKey: storageKey) as? [String: String] ?? [:]
            return store[key]
        }
        
        let setItem: @convention(block) (String, String) -> Void = { key, value in
            print("SWIFT: key \(key) value \(value)")
            var store = UserDefaults.standard.dictionary(forKey: storageKey) as? [String: String] ?? [:]
            store[key] = value
            UserDefaults.standard.set(store, forKey: storageKey)
        }
        
        let removeItem: @convention(block) (String) -> Void = { key in
            var store = UserDefaults.standard.dictionary(forKey: storageKey) as? [String: String] ?? [:]
            store.removeValue(forKey: key)
            UserDefaults.standard.set(store, forKey: storageKey)
        }
        
        let clear: @convention(block) () -> Void = {
            UserDefaults.standard.removeObject(forKey: storageKey)
        }
        
        let getLength: @convention(block) () -> Int = {
            let store = UserDefaults.standard.dictionary(forKey: storageKey) ?? [:]
            return store.count
        }
        
        context.evaluateScript("var localStorage = {};")
        let localStorage = context.objectForKeyedSubscript("localStorage")
        localStorage?.setObject(getItem, forKeyedSubscript: "getItem")
        localStorage?.setObject(setItem, forKeyedSubscript: "setItem")
        localStorage?.setObject(removeItem, forKeyedSubscript: "removeItem")
        localStorage?.setObject(clear, forKeyedSubscript: "clear")
        
        localStorage?.setObject(getLength, forKeyedSubscript: "_getLength")
        context.evaluateScript("""
            Object.defineProperty(localStorage, 'length', {
                get: function() { return localStorage._getLength(); }
            });
            var sessionStorage = localStorage;
        """)
    }
}

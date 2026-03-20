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
    
    func addLocalStorage(with context: JSContext, userDefaults: UserDefaultsProviding) {
        let storageKey = "BasedBridge.localStorage"
        
        let getItem: @convention(block) (String) -> String? = { key in
            let store = userDefaults.dictionary(forKey: storageKey) as? [String: String] ?? [:]
            return store[key]
        }
        
        let setItem: @convention(block) (String, String) -> Void = { key, value in
            var store = userDefaults.dictionary(forKey: storageKey) as? [String: String] ?? [:]
            store[key] = value
            userDefaults.set(store, forKey: storageKey)
        }
        
        let removeItem: @convention(block) (String) -> Void = { key in
            var store = userDefaults.dictionary(forKey: storageKey) as? [String: String] ?? [:]
            store.removeValue(forKey: key)
            userDefaults.set(store, forKey: storageKey)
        }
        
        let clear: @convention(block) () -> Void = {
            userDefaults.removeObject(forKey: storageKey)
        }
        
        let getLength: @convention(block) () -> Int = {
            let store = userDefaults.dictionary(forKey: storageKey) ?? [:]
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

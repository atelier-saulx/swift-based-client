//
//  BasedBridge+Global.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 06/12/2025.
//

import Foundation
import JavaScriptCore


// MARK: - Global

extension BasedBridge {
    
    func addGlobal(with context: JSContext) {
        let polyfill = """
        window = {}
        window.location = { href: "" }
        var global = this;
        var globalThis = this;
        """
        context.evaluateScript(polyfill)
    }
    
}

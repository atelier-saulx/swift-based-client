//
//  BasedOptsTests.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 02/01/2026.
//

import Testing
import Foundation
@testable import BasedClient


@Suite("BasedOpts Tests")
struct BasedOptsTests {
    
    @Test("BasedOpts creates with valid URL")
    func basedOptsJSValue() async throws {
        let opts = BasedOpts.url("wss://test.com")
        let jsValue = opts.jsValue
        
        #expect(jsValue.contains("wss://test.com"))
    }
}

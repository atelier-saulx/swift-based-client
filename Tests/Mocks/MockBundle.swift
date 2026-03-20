//
//  MockBundle.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 30/12/2025.
//

import Foundation
@testable import BasedClient


struct MockBundle: BundleProviding {
    var shouldReturnURL: Bool = true
    
    func url(forResource name: String, withExtension ext: String) -> URL? {
        guard shouldReturnURL else { return nil }
        // Return a test bundle URL
        return Bundle.module.url(forResource: name, withExtension: ext)
    }
}

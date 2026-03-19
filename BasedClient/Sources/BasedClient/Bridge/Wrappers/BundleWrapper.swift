//
//  BundleWrapper.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 30/12/2025.
//

import Foundation


protocol BundleProviding {
    func url(forResource name: String, withExtension ext: String) -> URL?
}

struct BundleWrapper: BundleProviding {
    func url(forResource name: String, withExtension ext: String) -> URL? {
        Bundle.module.url(forResource: name, withExtension: ext)
    }
}

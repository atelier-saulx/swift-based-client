//
//  String+Escape.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 04/12/2025.
//

extension String {
    var escapedJSON: String {
        self
        .replacingOccurrences(of: "\\", with: "\\\\")
        .replacingOccurrences(of: "'", with: "\\'")
        .replacingOccurrences(of: "\n", with: "\\n")
        .replacingOccurrences(of: "\r", with: "\\r")
    }
}

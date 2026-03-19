//
//  AuthState.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 04/12/2025.
//

import Foundation


public struct AuthState: Sendable, Equatable, Codable {
    public let token: String
    public let persistent: Bool
    public let refreshToken: String
    public let userId: String
    
    public init(
        token: String,
        persistent: Bool,
        refreshToken: String,
        userId: String
    ) {
        self.token = token
        self.userId = userId
        self.persistent = persistent
        self.refreshToken = refreshToken
    }
}

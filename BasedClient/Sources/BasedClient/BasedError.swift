//
//  BasedError.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 31/10/2025.
//

import Foundation

enum BasedError: LocalizedError, Equatable {
    case bundleNotFound
    case clientNotFound
    case initializationFailed
    case clientNotInitialized
    case queryFailed(String)
    case encodingFailed
    case contextUnavailable
    case invalidPayload
    case callFailed
    case resultSerializationFailed
    case jsError(String)
    case authStateNotAvailable
    
    
    
    var errorDescription: String? {
        switch self {
        case .bundleNotFound:
            return "Based client bundle (based-client.js) not found in Resources"
        case .clientNotFound:
            return "BasedClient not found in JavaScript bundle"
        case .initializationFailed:
            return "Failed to initialize Based client"
        case .clientNotInitialized:
            return "Client not initialized. Call init first."
        case .queryFailed(let message):
            return "Query failed: \(message)"
        case .encodingFailed:
            return "Encoding failed"
        case .contextUnavailable:
            return "Context is not available"
        case .invalidPayload:
            return "Invalid payload"
        case .callFailed:
            return "Call failed"
        case .resultSerializationFailed:
            return "Result serialization failed"
        case .jsError(let message):
            return "JavaScript error: \(message)"
        case .authStateNotAvailable:
            return "Authorization state not available"
        }
    }
}

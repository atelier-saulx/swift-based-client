//
//  Untitled.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 06/12/2025.
//

import Foundation

// NOTE: OS 18+ / macOS 15+, we could replace AtomicCounter with Swift's built-in Atomic from the Synchronization framework
final class AtomicCounter: @unchecked Sendable {
    private var value: Int = 0
    private let lock = NSLock()
    
    func increment() -> Int {
        lock.lock()
        defer { lock.unlock() }
        value += 1
        return value
    }
}

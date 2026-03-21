//
//  MockQueue.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 30/12/2025.
//

import Foundation
@testable import BasedClient


struct MockQueue: QueueProviding {
    private let queue: DispatchSerialQueue
    
    init() {
        self.queue = DispatchSerialQueue(label: "test.mock.queue")
    }
    
    var label: String {
        queue.label
    }
    
    func sync<T>(_ block: () -> T) -> T {
        queue.sync(execute: block)
    }
    
    func async(_ block: @Sendable @escaping () -> Void) {
        queue.async(execute: block)
    }
    
    var unownedSerialExecutor: UnownedSerialExecutor {
        queue.asUnownedSerialExecutor()
    }
}

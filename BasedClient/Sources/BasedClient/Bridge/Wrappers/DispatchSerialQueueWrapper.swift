//
//  QueueProviding.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 30/12/2025.
//

import Foundation


protocol QueueProviding {
    var label: String { get }
    func sync<T>(_ block: () -> T) -> T
    func async(_ block: @Sendable @escaping () -> Void)
    var unownedSerialExecutor: UnownedSerialExecutor { get }
}

struct DispatchSerialQueueWrapper: QueueProviding {
    private let queue: DispatchSerialQueue
    
    init(label: String) {
        self.queue = DispatchSerialQueue(label: label)
    }
    
    var label: String { queue.label }
    
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

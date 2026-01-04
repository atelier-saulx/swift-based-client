//
//  BasedBridge+Timers.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 06/12/2025.
//

import Foundation
import JavaScriptCore


// MARK: - Timers

extension BasedBridge {
    
    // setTimeout, setInterval, clearTimeout
    func addTimers(with context: JSContext) {
        let setTimeout: @convention(block) @Sendable (JSValue, Int) -> Int = { [weak self] callback, delay in
            guard let self = self else { return -1 }
            
            let timerId = Self.timerIdCounter.increment()
            
            Task {
                await self.createTimeout(timerId: timerId, callback: callback, delay: delay)
            }
            
            return timerId
        }
        
        let setInterval: @convention(block) @Sendable (JSValue, Int) -> Int = { [weak self] callback, delay in
            guard let self = self else { return -1 }
            
            let timerId = Self.timerIdCounter.increment()
            
            Task {
                await self.createInterval(timerId: timerId, callback: callback, delay: delay)
            }
            
            return timerId
        }
        
        let clearTimer: @convention(block) @Sendable (Int) -> Void = { [weak self] timerId in
            Task {
                await self?.cancelTimer(timerId)
            }
        }
        
        context.setObject(setTimeout, forKeyedSubscript: "setTimeout" as NSString)
        context.setObject(setInterval, forKeyedSubscript: "setInterval" as NSString)
        context.setObject(clearTimer, forKeyedSubscript: "clearTimeout" as NSString)
        context.setObject(clearTimer, forKeyedSubscript: "clearInterval" as NSString)
    }
    
    // MARK: - Helpers
    
    private func createTimeout(timerId: Int, callback: JSValue, delay: Int) async {
        let task = Task { [weak self] in
            try? await Task.sleep(for: .milliseconds(delay))
            await self?.executeTimerCallback(callback, timerId: timerId, isInterval: false)
        }
        
        timers[timerId] = task
    }
    
    private func createInterval(timerId: Int, callback: JSValue, delay: Int) async {
        let task = Task { [weak self] in
            while !Task.isCancelled {
                try? await Task.sleep(for: .milliseconds(delay))
                
                guard !Task.isCancelled else { break }
                
                await self?.executeTimerCallback(callback, timerId: nil, isInterval: true)
            }
        }
        
        timers[timerId] = task
    }
    
    private func executeTimerCallback(_ callback: JSValue, timerId: Int?, isInterval: Bool) {
        callback.call(withArguments: [])
        
        if !isInterval, let timerId = timerId {
            timers.removeValue(forKey: timerId)
        }
    }
    
    private func cancelTimer(_ timerId: Int) {
        timers[timerId]?.cancel()
        timers.removeValue(forKey: timerId)
    }
}

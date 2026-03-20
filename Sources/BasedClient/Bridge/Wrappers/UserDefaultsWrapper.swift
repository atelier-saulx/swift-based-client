//
//  UserDefaultsWrapper.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 09/01/2026.
//

import Foundation


protocol UserDefaultsProviding: Sendable {
    func string(forKey key: String) -> String?
    func set(_ value: Any?, forKey key: String)
    func removeObject(forKey key: String)
    func synchronize() -> Bool
    func dictionary(forKey key: String) -> [String: Any]?
}

extension UserDefaults: @unchecked @retroactive Sendable {}

struct UserDefaultsWrapper: UserDefaultsProviding {
    private let userDefaults: UserDefaults
    
    init(userDefaults: UserDefaults = .standard) {
        self.userDefaults = userDefaults
    }
    
    func string(forKey key: String) -> String? {
        userDefaults.string(forKey: key)
    }
    
    func set(_ value: Any?, forKey key: String) {
        userDefaults.set(value, forKey: key)
    }
    
    func removeObject(forKey key: String) {
        userDefaults.removeObject(forKey: key)
    }
    
    func synchronize() -> Bool {
        userDefaults.synchronize()
    }
    
    func dictionary(forKey key: String) -> [String : Any]? {
        userDefaults.dictionary(forKey: key)
    }
}

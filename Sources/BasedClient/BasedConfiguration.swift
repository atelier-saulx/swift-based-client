//
//  BasedConfiguration.swift
//  
//
//  Created by Alexander van der Werff on 26/11/2021.
//

import Foundation

public struct BasedConfiguration {
    let cluster: String = "production"
    let org: String
    let project: String
    let env: String
    let name: String = "@based/env-hub"
    let key: String = ""
    let optionalKey: Bool = false
    let host: String = ""
    let discoveryUrl: String = ""

    public init(org: String, project: String, env: String) {
        self.org = org
        self.project = project
        self.env = env
    }
}

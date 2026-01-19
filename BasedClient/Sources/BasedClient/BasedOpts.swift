//
//  BasedConfiguration.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 31/10/2025.
//

import Foundation

public enum BasedOpts: Sendable {
    case url(String)
    case options(options: Options)
    
    public struct Options: Sendable {
        let env: String
        let org: String
        let project: String
        let cluster: String?
        
        public init(env: String, org: String, project: String, cluster: String? = nil) {
            self.env = env
            self.org = org
            self.project = project
            self.cluster = cluster
        }
    }
    
    public var jsValue: String {
        switch self {
        case .url(let url):
            return """
            (async () => {
                const basedClient = new Based.BasedClient({url: "\(url)"})
                globalThis.basedClient = basedClient;
                await basedClient.connect();
            })();
            """
        case .options(options: let opts):
            return """
                const basedClient = new Based.BasedClient({
                    cluster: '\(opts.cluster ?? "production")',
                    org: '\(opts.org)',
                    project: '\(opts.project)',
                    env: '\(opts.env)',
                })
            """
        }
    }
}

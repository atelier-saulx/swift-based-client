//
//  Based+Get.swift
//  
//
//  Created by Alexander van der Werff on 16/01/2022.
//

import Foundation
import NakedJson

extension Based {
    
    /**
     This function is used to perform a GET request to the Based database.
     
     let result = try get(name: "name", payload: ["key": "value"])
     
     - Parameters:
        - name: The name of the resource to be retrieved.
        - payload: The payload to be sent as part of the request. Defaults to an empty dictionary.
     
     - Returns:
        A Result object, which is the decoded response of the request.
     
     - Throws: BasedError
     
     */
    public func get<Result: Decodable>(name: String, payload: Json = [:]) async throws -> Result {
        try await withCheckedThrowingContinuation { [weak self] continuation in
            guard let self
            else {
                continuation.resume(throwing: BasedError.other(message: "Function could not complete"))
                return
            }
            do {
                let payload = try self.jsonEncoder.encode(payload)
                Current.basedClient.get(name: name, payload: payload.description) { dataString, errorString in
                    guard
                        let data = dataString.data(using: .utf8),
                        errorString.isEmpty
                    else {
                        
                        let error = BasedError.from(errorString)
                        continuation.resume(throwing: error)
                        return
                    }
                    do {
                        let value = try self.decoder.decode(Result.self, from: data)
                        continuation.resume(returning: value)
                    } catch {
                        continuation.resume(throwing: error)
                    }
                }
            } catch {
                continuation.resume(throwing: error)
            }
        }
    }
    
    public func get<Result: Decodable>(query: Query) async throws -> Result {
        let queryString = query.jsonStringify()
        return try await function(name: "based-db-get", payload: queryString)
    }
    
}

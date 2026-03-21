//
//  BasedClient.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 31/10/2025.
//

import Foundation

public protocol BasedClient {
    
    func authState() async throws -> AuthState?
    
    func setAuthState(state: AuthState) async throws
    
    func call<Response: Decodable & Sendable>(
        _ functionName: String
    ) async throws -> Response
    
    func call<Request: Encodable & Sendable, Response: Decodable & Sendable>(
        _ functionName: String,
        payload: Request
    ) async throws -> Response
    
    func query<Response: Decodable & Sendable>(
        name: String
    ) async throws -> Response
    
    func query<Response: Decodable & Sendable>(
        name: String,
        opts: QueryOptions?
    ) async throws -> Response
    
    func query<Response: Decodable & Sendable, Payload: Encodable & Sendable>(
        name: String,
        payload: Payload
    ) async throws -> Response
    
    func query<Response: Decodable & Sendable, Payload: Encodable & Sendable>(
        name: String,
        payload: Payload,
        opts: QueryOptions?
    ) async throws -> Response
    
    func queryStream<Request: Encodable & Sendable, Response: Decodable & Sendable>(
        _ functionName: String,
        payload: Request
    ) async throws -> AsyncThrowingStream<Response, Error>
    
    func stream(
        _ functionName: String,
        options: StreamOptions,
        progressListener: StreamProgressListener?
    ) async throws
}

public struct QueryOptions: Sendable {} // TODO define query options
public struct EmptyPayload: Encodable, Sendable {}

public final class Based: BasedClient, Sendable {
    
    private let basedOpts: BasedOpts
    private let bridge: BasedBridgeProtocol
    private let encoder = JSONEncoder()
    private let decoder = JSONDecoder()
    
    public init(basedOpts: BasedOpts) async throws {
        self.basedOpts = basedOpts
        self.bridge = try await BasedBridge.create(basedOpts: basedOpts)
    }
    
    // MARK: - For testing
    internal init(basedOpts: BasedOpts, bridge: BasedBridgeProtocol) {
        self.basedOpts = basedOpts
        self.bridge = bridge
    }
    
    public func call<Response: Decodable & Sendable>(
        _ functionName: String
    ) async throws -> Response {
        return try await call(functionName, payload: EmptyPayload())
    }
    
    public func call<Request: Encodable & Sendable, Response: Decodable & Sendable>(
        _ functionName: String,
        payload: Request
    ) async throws -> Response {
        let data = try await callRaw(functionName, payload: payload)
        return try decoder.decode(Response.self, from: data)
    }
    
    public func callRaw<Request: Encodable & Sendable>(
        _ functionName: String,
        payload: Request
    ) async throws -> Data {
        let jsonData = try encoder.encode(payload)
        guard let jsonString = String(data: jsonData, encoding: .utf8) else {
            throw BasedError.encodingFailed
        }
        
        return try await bridge.executeCall(
            functionName: functionName,
            jsonPayload: jsonString
        )
    }
    
    // MARK: - Auth
    
    public func authState() async throws -> AuthState?  {
        guard let jsonString = try await bridge.authState() else {
            throw BasedError.authStateNotAvailable
        }
        guard let jsonData = jsonString.data(using: .utf8) else {
            throw BasedError.encodingFailed
        }
        //TODO: - just return decoded value once the bridge response is clear
        do {
            let authState = try decoder.decode(AuthState.self, from: jsonData)
            return authState
        } catch {
            return nil
        }
    }
    
    public func setAuthState(state: AuthState) async throws {
        let jsonData = try encoder.encode(state)
        guard let jsonString = String(data: jsonData, encoding: .utf8) else {
            throw BasedError.encodingFailed
        }
        try await bridge.setAuthState(state: jsonString)
    }
    
    public func query<Response: Decodable & Sendable>(
        name: String
    ) async throws -> Response {
        return try await query(
            name: name,
            opts: nil
        )
    }
    
    public func query<Response: Decodable & Sendable, Payload: Encodable & Sendable>(
        name: String,
        payload: Payload
    ) async throws -> Response {
        return try await query(
            name: name,
            payload: payload,
            opts: nil
        )
    }

    public func query<Response: Decodable & Sendable>(
        name: String,
        opts: QueryOptions?
    ) async throws -> Response {
        let data = try await bridge.executeQuery(functionName: name, jsonPayload: nil)
        return try decoder.decode(Response.self, from: data)
    }
    
    public func query<Response: Decodable & Sendable, Payload: Encodable & Sendable>(
        name: String,
        payload: Payload,
        opts: QueryOptions?
    ) async throws -> Response {
        let jsonData = try encoder.encode(payload)
        let jsonString = String(data: jsonData, encoding: .utf8)!
        let data = try await bridge.executeQuery(functionName: name, jsonPayload: jsonString)
        return try decoder.decode(Response.self, from: data)
    }
    
    public func queryStream<Request: Encodable & Sendable, Response: Decodable & Sendable>(
        _ functionName: String,
        payload: Request
    ) async throws -> AsyncThrowingStream<Response, Error> {
        let payload = try encoder.encode(payload)
        return try await bridge.queryStream(functionName, payload: payload)
    }
    
    //MARK: - Stream
    
    public func stream(
        _ functionName: String,
        options: StreamOptions,
        progressListener: StreamProgressListener? = nil
    ) async throws {

        let (data, size) = try getContentData(from: options.contents)
        
        try await bridge.uploadStream(
            functionName: functionName,
            data: data,
            size: size,
            fileName: options.fileName,
            mimeType: options.mimeType,
            extension: options.extension,
            payload: options.payloadJSON ?? "{}",
            progressListener: progressListener
        )
    }
    
    private func getContentData(from contents: StreamOptions.StreamContents) throws -> (Data, Int) {
        switch contents {
        case .file(let url):
            let data = try Data(contentsOf: url)
            return (data, data.count)
            
        case .data(let data):
            return (data, data.count)
            
        case .string(let string):
            guard let data = string.data(using: .utf8) else {
                throw BasedError.encodingFailed
            }
            return (data, data.count)
        }
    }

}

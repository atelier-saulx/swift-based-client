//
//  BasedClientTests.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 02/01/2026.
//

import Testing
import Foundation
@testable import BasedClient


// MARK: - Test Models

struct TestRequest: Codable, Sendable, Equatable {
    let id: Int
    let name: String
}

struct TestResponse: Codable, Sendable, Equatable {
    let success: Bool
    let message: String
}

struct TestQueryResponse: Codable, Sendable, Equatable {
    let list: [TestResponse]
}

// MARK: - Based Client Tests

final class MockBasedBridge: BasedBridgeProtocol, @unchecked Sendable {
    
    private let lock = NSLock()
    
    private var _executeCallCalls: [(functionName: String, jsonPayload: String?)] = []
    private var _executeQueryCalls: [(functionName: String, jsonPayload: String?)] = []
    private var _authStateCalls: Int = 0
    private var _setAuthStateCalls: [(String)] = []
    
    var executeCallCalls: [(functionName: String, jsonPayload: String?)] {
        lock.withLock { _executeCallCalls }
    }
    
    var executeQueryCalls: [(functionName: String, jsonPayload: String?)] {
        lock.withLock { _executeQueryCalls }
    }
    
    var authStateCalls: Int {
        lock.withLock { _authStateCalls }
    }
    
    var setAuthStateCalls: [(String)] {
        lock.withLock { _setAuthStateCalls }
    }
    
    var executeCallResponse: Result<Data, Error> = .failure(BasedError.callFailed)
    var executeQueryResponse: Result<Data, Error> = .failure(BasedError.callFailed)
    var authStateResponse: Result<String?, Error> = .success(nil)
    var setAuthStateResponse: Result<Void, Error> = .success(())
    
    func executeCall(functionName: String, jsonPayload: String?) async throws -> Data {
        lock.withLock {
            _executeCallCalls.append((functionName, jsonPayload))
        }
        
        switch executeCallResponse {
        case .success(let data):
            return data
        case .failure(let error):
            throw error
        }
    }
    
    func executeQuery(functionName: String, jsonPayload: String?) async throws -> Data {
        lock.withLock {
            _executeQueryCalls.append((functionName, jsonPayload))
        }
        
        switch executeQueryResponse {
        case .success(let data):
            return data
        case .failure(let error):
            throw error
        }
    }
    
    func authState() async throws -> String? {
        lock.withLock {
            _authStateCalls += 1
        }
        
        switch authStateResponse {
        case .success(let state):
            return state
        case .failure(let error):
            throw error
        }
    }
    
    func setAuthState(state: String) async throws {
        lock.withLock {
            _setAuthStateCalls.append((state))
        }
        
        switch setAuthStateResponse {
        case .success():
            return
        case .failure(let error):
            throw error
        }
    }
    
    func queryStream<Response: Decodable & Sendable>(
        _ functionName: String,
        payload: Data
    ) async throws -> AsyncThrowingStream<Response, Error> {
        return AsyncThrowingStream { continuation in
            continuation.finish()
        }
    }
    
    func uploadStream(
        functionName: String,
        data: Data,
        size: Int,
        fileName: String,
        mimeType: String,
        extension: String,
        payload: String,
        progressListener: StreamProgressListener?
    ) async throws {
        
    }
    
}


@Suite("Based Client Tests")
struct BasedClientTests {
    
    @Test("Call without payload encodes empty payload and decodes response")
    func callWithoutPayload() async throws {
        
        let mockBridge = MockBasedBridge()
        let response = TestResponse(success: true, message: "OK")
        let responseData = try JSONEncoder().encode(response)
        mockBridge.executeCallResponse = .success(responseData)
        
        let basedOpts = BasedOpts.url("ws://test")
        let client = Based(basedOpts: basedOpts, bridge: mockBridge)
        
        let result: TestResponse = try await client.call("test-function")
        
        #expect(result.success == true)
        #expect(result.message == "OK")
        #expect(mockBridge.executeCallCalls.count == 1)
        #expect(mockBridge.executeCallCalls[0].functionName == "test-function")
        #expect(mockBridge.executeCallCalls[0].jsonPayload == "{}")
    }
    
    @Test("Call with payload encodes request and decodes response")
    func callWithPayload() async throws {
        
        let mockBridge = MockBasedBridge()
        let response = TestResponse(success: true, message: "Created")
        let responseData = try JSONEncoder().encode(response)
        mockBridge.executeCallResponse = .success(responseData)
        
        let basedOpts = BasedOpts.url("ws://test")
        let client = Based(basedOpts: basedOpts, bridge: mockBridge)
        
        let request = TestRequest(id: 42, name: "Test Item")
        
        let result: TestResponse = try await client.call("create-item", payload: request)
        
        #expect(result.success == true)
        #expect(result.message == "Created")
        #expect(mockBridge.executeCallCalls.count == 1)
        #expect(mockBridge.executeCallCalls[0].functionName == "create-item")
        
        let sentPayload = mockBridge.executeCallCalls[0].jsonPayload
        #expect(sentPayload?.contains("\"id\":42") == true)
        #expect(sentPayload?.contains("\"name\":\"Test Item\"") == true)
    }
    
    @Test("Call throws when bridge fails")
    func callThrowsOnBridgeFailure() async throws {
        
        let mockBridge = MockBasedBridge()
        mockBridge.executeCallResponse = .failure(BasedError.callFailed)
        
        let basedOpts = BasedOpts.url("ws://test")
        let client = Based(basedOpts: basedOpts, bridge: mockBridge)
        
        await #expect(throws: BasedError.callFailed) {
            let _: TestResponse = try await client.call("test-function")
        }
    }
    
    @Test("Call throws when response cannot be decoded")
    func callThrowsOnInvalidResponse() async throws {
        
        let mockBridge = MockBasedBridge()
        let invalidJSON = "{ invalid json }".data(using: .utf8)!
        mockBridge.executeCallResponse = .success(invalidJSON)
        
        let basedOpts = BasedOpts.url("ws://test")
        let client = Based(basedOpts: basedOpts, bridge: mockBridge)
        
        await #expect(throws: Error.self) {
            let _: TestResponse = try await client.call("test-function")
        }
    }
    
    @Test("Query without payload returns decoded response")
    func queryWithoutPayload() async throws {

        let mockBridge = MockBasedBridge()
        let list = [
            TestResponse(success: true, message: "message"),
            TestResponse(success: false, message: "message")
        ]
        let response = TestQueryResponse(list: list)
        let responseData = try JSONEncoder().encode(response)
        mockBridge.executeQueryResponse = .success(responseData)
        
        let basedOpts = BasedOpts.url("ws://test")
        let client = Based(basedOpts: basedOpts, bridge: mockBridge)
        
        let result: TestQueryResponse = try await client.query(name: "list")
        
        #expect(result.list.count == 2)
        #expect(result.list[0].success == true)
        #expect(result.list[1].message == "message")
        #expect(mockBridge.executeQueryCalls.count == 1)
        #expect(mockBridge.executeQueryCalls[0].functionName == "list")
        #expect(mockBridge.executeQueryCalls[0].jsonPayload == nil)
    }
    
    @Test("Query with payload encodes and decodes correctly")
    func queryWithPayload() async throws {
        
        let mockBridge = MockBasedBridge()
        let response = TestResponse(success: true, message: "Found")
        let responseData = try JSONEncoder().encode(response)
        mockBridge.executeQueryResponse = .success(responseData)
        
        let basedOpts = BasedOpts.url("ws://test")
        let client = Based(basedOpts: basedOpts, bridge: mockBridge)
        
        let request = TestRequest(id: 5, name: "Search Term")
        
        let result: TestResponse = try await client.query(name: "search", payload: request)
        
        #expect(result.success == true)
        #expect(mockBridge.executeQueryCalls.count == 1)
        #expect(mockBridge.executeQueryCalls[0].functionName == "search")
        
        let sentPayload = mockBridge.executeQueryCalls[0].jsonPayload
        #expect(sentPayload?.contains("\"id\":5") == true)
        #expect(sentPayload?.contains("\"name\":\"Search Term\"") == true)
    }
    
    @Test("Query with opts passes opts parameter")
    func queryWithOpts() async throws {
    
        let mockBridge = MockBasedBridge()
        let response = TestQueryResponse(list: [])
        let responseData = try JSONEncoder().encode(response)
        mockBridge.executeQueryResponse = .success(responseData)
        
        let basedOpts = BasedOpts.url("ws://test")
        let client = Based(basedOpts: basedOpts, bridge: mockBridge)
        
        let opts = QueryOptions()
        
        let result: TestQueryResponse = try await client.query(name: "list", opts: opts)
        
        #expect(result.list.isEmpty)
        #expect(mockBridge.executeQueryCalls.count == 1)
    }
}

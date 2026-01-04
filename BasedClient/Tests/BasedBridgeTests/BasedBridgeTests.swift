//
//  BasedBridgeTests.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 30/12/2025.
//

import Testing
import JavaScriptCore
@testable import BasedClient


@Suite("BasedBridge Tests")
struct BasedBridgeTests {
    
    private func createMockWebSocket() -> WebSocket? {
        let testContext = JSContext()!
        return WebSocket.create(
            urlString: "ws://mock-test-url",
            protocols: nil,
            jsContext: testContext
        )
    }
    
    @Test("Setup succeeds with valid bundle")
    func setupSuccess() async throws {
        
        let mockContext = MockJSContext()
        let mockQueue = MockQueue()
        let mockBundle = MockBundle()
        let mockFactory = MockWebSocketFactory(mockWebSocket: createMockWebSocket())
        
        let basedValue = JSValue(nullIn: JSContext())!
        mockContext.mockValues["Based"] = basedValue
        
        let bridge = BasedBridge(
            queue: mockQueue,
            context: mockContext,
            bundle: mockBundle,
            webSocketFactory: mockFactory,
            instanceId: "id"
        )
        
        try await bridge.setup()
        
        #expect(mockContext.scriptEvaluations.count > 0)
    }
    
    @Test("Setup fails when bundle not found")
    func setupFailsWithoutBundle() async {
        // Arrange
        let mockContext = MockJSContext()
        let mockQueue = MockQueue()
        var mockBundle = MockBundle()
        mockBundle.shouldReturnURL = false
        let mockFactory = MockWebSocketFactory(mockWebSocket: createMockWebSocket())
        
        let bridge = BasedBridge(
            queue: mockQueue,
            context: mockContext,
            bundle: mockBundle,
            webSocketFactory: mockFactory,
            instanceId: "id"
        )
        
        await #expect(throws: BasedError.bundleNotFound) {
            try await bridge.setup()
        }
    }
    
    @Test("Execute call with payload")
    func executeCallWithPayload() async throws {
        
        let mockContext = MockJSContext()
        let mockQueue = MockQueue()
        let mockBundle = MockBundle()
        let mockFactory = MockWebSocketFactory(mockWebSocket: createMockWebSocket())
        
        let bridge = BasedBridge(
            queue: mockQueue,
            context: mockContext,
            bundle: mockBundle,
            webSocketFactory: mockFactory,
            instanceId: "id"
        )
        
        let jsonPayload = #"{"test": "data"}"#
        
        let mockPromise = MockJSValue.successPromise(data: ["result": "success"])
        mockContext.nextEvaluation = mockPromise
        
        let result = try await bridge.executeCall(
            functionName: "test-function",
            jsonPayload: jsonPayload
        )
        
        #expect(!result.isEmpty)
        #expect(mockContext.scriptEvaluations.contains { $0.contains("basedClient.call") })
        #expect(mockContext.scriptEvaluations.contains { $0.contains("test-function") })
    }
    
    @Test("Execute query without payload")
    func executeQueryWithoutPayload() async throws {

        let mockContext = MockJSContext()
        let mockQueue = MockQueue()
        let mockBundle = MockBundle()
        let mockFactory = MockWebSocketFactory(mockWebSocket: createMockWebSocket())
        
        let bridge = BasedBridge(
            queue: mockQueue,
            context: mockContext,
            bundle: mockBundle,
            webSocketFactory: mockFactory,
            instanceId: "id"
        )
        
        let mockPromise = MockJSValue.successPromise(data: ["workspaces": []])
        mockContext.nextEvaluation = mockPromise
        
        let result = try await bridge.executeQuery(
            functionName: "workspaces-list",
            jsonPayload: nil
        )
        
        // Assert
        #expect(!result.isEmpty)
        #expect(mockContext.scriptEvaluations.contains { $0.contains("(no payload)") })
    }
    
    @Test(
        "Execute call with various payloads",
        arguments: [
            ("test-1", #"{"id": 1}"#),
            ("test-2", #"{"name": "test"}"#),
            ("test-3", nil)
        ]
    )
    func executeCallVariousPayloads(functionName: String, payload: String?) async throws {
    
        let mockContext = MockJSContext()
        let mockQueue = MockQueue()
        let mockBundle = MockBundle()
        let mockFactory = MockWebSocketFactory(mockWebSocket: createMockWebSocket())
        
        let bridge = BasedBridge(
            queue: mockQueue,
            context: mockContext,
            bundle: mockBundle,
            webSocketFactory: mockFactory,
            instanceId: "id"
        )
        
        let mockPromise = MockJSValue.successPromise(data: [:])
        mockContext.nextEvaluation = mockPromise
        
        let result = try await bridge.executeCall(
            functionName: functionName,
            jsonPayload: payload
        )
        
        #expect(!result.isEmpty)
    }
}

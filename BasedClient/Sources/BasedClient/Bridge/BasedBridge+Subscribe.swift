//
//  BasedBridge+Subscription.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 13/12/2025.
//

import Foundation
import JavaScriptCore


extension BasedBridge {
    
    func queryStream<Response: Decodable & Sendable>(
        _ functionName: String,
        payload: Data
    ) async throws -> AsyncThrowingStream<Response, Error> {
        
        // payload is already encoded Data, just convert to string
        guard let jsonString = String(data: payload, encoding: .utf8) else {
            throw BasedError.encodingFailed
        }
        
        return AsyncThrowingStream { continuation in
            Task {
                do {
                    let subscriptionId = try await subscribeToQuery(
                        functionName: functionName,
                        jsonPayload: jsonString,
                        onData: { data in
                            do {
                                let decoded = try JSONDecoder().decode(Response.self, from: data)
                                continuation.yield(decoded)
                            } catch {
                                continuation.finish(throwing: error)
                            }
                        },
                        onError: { error in
                            continuation.finish(throwing: error)
                        }
                    )
                    
                    continuation.onTermination = { @Sendable _ in
                        Task {
                            await self.unsubscribe(subscriptionId: subscriptionId)
                        }
                    }
                    
                } catch {
                    continuation.finish(throwing: error)
                }
            }
        }
    }
    
    func subscribeToQuery(
        functionName: String,
        jsonPayload: String,
        onData: @escaping (Data) -> Void,
        onError: @escaping (Error) -> Void
    ) async throws -> String {
        
        let subscriptionId = UUID().uuidString
        
        let script = """
        (function() {
            try {
                const payload = JSON.parse('\(jsonPayload.escapedJSON)');
                console.log('[Based Subscribe] \(functionName)', payload);
                
                const query = basedClient.query('\(functionName)', payload);
                
                if (!globalThis.__subscriptions) {
                    globalThis.__subscriptions = {};
                }
                
                const subscription = query.subscribe(
                    (data) => {
                        console.log('[Based Subscribe] Data received');
                        // Call Swift callback
                        __onQueryData('\(subscriptionId)', JSON.stringify(data));
                    },
                    (error) => {
                        console.error('[Based Subscribe] Error:', error);
                        __onQueryError('\(subscriptionId)', error.message);
                    }
                );
                
                globalThis.__subscriptions['\(subscriptionId)'] = subscription;
                
                return { success: true, subscriptionId: '\(subscriptionId)' };
                
            } catch (error) {
                console.error('[Based Subscribe Error]', error.message);
                return { success: false, error: error.message };
            }
        })()
    """
        
        let onDataCallback: @convention(block) (String, String) -> Void = { subId, dataJSON in
            guard let data = dataJSON.data(using: .utf8) else { return }
            onData(data)
        }
        
        let onErrorCallback: @convention(block) (String, String) -> Void = { subId, errorMsg in
            onError(BasedError.jsError(errorMsg))
        }
        
        getContext().setObject(onDataCallback, forKeyedSubscript: "__onQueryData" as NSString)
        getContext().setObject(onErrorCallback, forKeyedSubscript: "__onQueryError" as NSString)
        
        guard let result = getContext().evaluateScript(script),
              result.objectForKeyedSubscript("success")?.toBool() == true else {
            throw BasedError.callFailed
        }
        
        return subscriptionId
    }
    
    func unsubscribe(subscriptionId: String) {
        getContext().evaluateScript("""
        (function() {
            if (globalThis.__subscriptions && globalThis.__subscriptions['\(subscriptionId)']) {
                globalThis.__subscriptions['\(subscriptionId)']();  // Call the function directly
                delete globalThis.__subscriptions['\(subscriptionId)'];
                console.log('[Based] Unsubscribed: \(subscriptionId)');
            }
        })()
        """)
    }
}

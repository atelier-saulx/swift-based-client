//
//  BasedBridge+Fetch.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 06/12/2025.
//

import Foundation
import JavaScriptCore


// MARK: - Fetch

extension BasedBridge {
    
    func addFetch(with context: JSContext) {
        let fetch: @convention(block) (String, JSValue?) -> JSValue = { [weak self, context] urlString, options in
            guard let self = self,
                  let promiseConstructor = context.objectForKeyedSubscript("Promise") else {
                return JSValue(undefinedIn: context)
            }
            
            let promiseHandler: @convention(block) @Sendable (JSValue, JSValue) -> Void = { resolve, reject in
                Task { [weak self] in
                    await self?.performFetch(
                        urlString: urlString,
                        options: options,
                        resolve: resolve,
                        reject: reject,
                        context: context
                    )
                }
            }
            
            return promiseConstructor.construct(withArguments: [promiseHandler])
        }
        
        context.setObject(fetch, forKeyedSubscript: "fetch" as NSString)
    }
    
    //MARK: - Helpers
    
    private func performFetch(
        urlString: String,
        options: JSValue?,
        resolve: JSValue,
        reject: JSValue,
        context: JSContext
    ) async {
        guard let url = URL(string: urlString) else {
            reject.call(withArguments: ["Invalid URL"])
            return
        }
        
        var request = URLRequest(url: url)
        
        if let options = options, !options.isUndefined {
            if let method = options.objectForKeyedSubscript("method")?.toString() {
                request.httpMethod = method.uppercased()
            }
            
            if let headers = options.objectForKeyedSubscript("headers"),
               let headersDict = headers.toDictionary() as? [String: String] {
                for (key, value) in headersDict {
                    request.setValue(value, forHTTPHeaderField: key)
                }
            }
            
            if let body = options.objectForKeyedSubscript("body")?.toString() {
                request.httpBody = body.data(using: .utf8)
            }
        }
        
        do {
            let (data, response) = try await URLSession.shared.data(for: request)
            
            guard let httpResponse = response as? HTTPURLResponse else {
                reject.call(withArguments: ["Invalid response"])
                return
            }

            let responseObj = createResponse(data: data, httpResponse: httpResponse, context: context)
            resolve.call(withArguments: [responseObj])
            
        } catch {
            reject.call(withArguments: [error.localizedDescription])
        }
    }
    
    private func createResponse(data: Data, httpResponse: HTTPURLResponse, context: JSContext) -> JSValue {

        let responseDict: [String: Any] = [
            "ok": (200...299).contains(httpResponse.statusCode),
            "status": httpResponse.statusCode,
            "statusText": HTTPURLResponse.localizedString(forStatusCode: httpResponse.statusCode),
            "url": httpResponse.url?.absoluteString ?? ""
        ]
        
        let responseValue = JSValue(object: responseDict, in: context)!
        
        let jsonMethod: @convention(block) () -> JSValue = { [weak context] in
            guard let promiseConstructor = context?.objectForKeyedSubscript("Promise") else {
                return JSValue(undefinedIn: context)
            }
            
            let handler: @convention(block) (JSValue, JSValue) -> Void = { resolve, reject in
                do {
                    let json = try JSONSerialization.jsonObject(with: data)
                    resolve.call(withArguments: [json])
                } catch {
                    reject.call(withArguments: [error.localizedDescription])
                }
            }
            
            return promiseConstructor.construct(withArguments: [handler])
        }
        responseValue.setValue(jsonMethod, forProperty: "json")
        
        let textMethod: @convention(block) () -> JSValue = { [weak context] in
            guard let promiseConstructor = context?.objectForKeyedSubscript("Promise") else {
                return JSValue(undefinedIn: context)
            }
            
            let handler: @convention(block) (JSValue, JSValue) -> Void = { resolve, reject in
                if let text = String(data: data, encoding: .utf8) {
                    resolve.call(withArguments: [text])
                } else {
                    reject.call(withArguments: ["Failed to decode text"])
                }
            }
            
            return promiseConstructor.construct(withArguments: [handler])
        }
        responseValue.setValue(textMethod, forProperty: "text")
        
        return responseValue
    }
}

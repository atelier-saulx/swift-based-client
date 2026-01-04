//
//  BasedBridge+WebSocket.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 06/12/2025.
//

import Foundation
import JavaScriptCore


// MARK: - WebSocket

extension BasedBridge {
    
    func addWebSocket(with context: JSContext, and webSocketFactory: WebSocketFactoryProviding) {
        
        let factory = webSocketFactory
        
        let WebSocketConstructor: @convention(block) (String, JSValue?) -> JSValue = { [weak context, weak self, factory] urlString, protocols in
            guard let context, let self else { return JSValue(undefinedIn: nil) }
            guard
                let instance = factory.create(urlString: urlString, protocols: protocols, jsContext: context),
                let jsObject = JSValue(newObjectIn: context)
            else { return JSValue(undefinedIn: nil) }
            
            Task {
                await self.storeWebSocket(instance)
                await instance.connect()
            }
            
            let addEventListener: @convention(block) (String, JSValue) -> Void = { type, callback in
                print("JS called addEventListener('\(type)', callback)")
                Task {
                    await instance.addEventListener(type: type, callback: callback)
                }
            }
            
            jsObject.setValue(addEventListener, forProperty: "addEventListener")
            
            let send: @convention(block) (JSValue) -> Void = {  value in
                Task {
                    guard let ws = await self.getWebSocket() else {
                        print("[WebSocket] No instance")
                        return
                    }
                    
                    if value.isString {
                        try? await ws.send(text: value.toString())
                    } else if value.isObject {
                        guard let length = value.objectForKeyedSubscript("length")?.toUInt32() else {
                            print("Object has no length property")
                            return
                        }
                        
                        var bytes: [UInt8] = []
                        bytes.reserveCapacity(Int(length))
                        
                        for i in 0..<length {
                            if let byte = value.objectAtIndexedSubscript(Int(i))?.toUInt32() {
                                bytes.append(UInt8(byte & 0xFF))
                            }
                        }
                        
                        let data = Data(bytes)
                        
                        try? await ws.send(data: data)
                    }
                }
            }
            
            jsObject.setValue(send, forProperty: "send")
            
            let close: @convention(block) (JSValue) -> Void = { value in
                print(value)
            }
            
            jsObject.setValue(close, forProperty: "close")
            
            return jsObject
        }
        
        context.setObject(WebSocketConstructor, forKeyedSubscript: "WebSocket" as NSString)
    }
}

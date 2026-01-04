//
//  BasedBridge+TextEncoder.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 06/12/2025.
//

import Foundation
import JavaScriptCore


// MARK: - TextEncoderDecoder

extension BasedBridge {
    
    func addTextEncoderDecoder(with context: JSContext) {
        
        context.evaluateScript("""
            var TextEncoder = function() {};
            TextEncoder.prototype.encode = function(string) {
                var utf8 = [];
                for (var i = 0; i < string.length; i++) {
                    var charcode = string.charCodeAt(i);
                    if (charcode < 0x80) utf8.push(charcode);
                    else if (charcode < 0x800) {
                        utf8.push(0xc0 | (charcode >> 6), 
                                  0x80 | (charcode & 0x3f));
                    }
        
                    else if (charcode < 0xd800 || charcode >= 0xe000) {
                        utf8.push(0xe0 | (charcode >> 12), 
                                  0x80 | ((charcode>>6) & 0x3f), 
                                  0x80 | (charcode & 0x3f));
                    }
                    else {
                        i++;
                        charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                                  | (string.charCodeAt(i) & 0x3ff));
                        utf8.push(0xf0 | (charcode >>18), 
                                  0x80 | ((charcode>>12) & 0x3f), 
                                  0x80 | ((charcode>>6) & 0x3f), 
                                  0x80 | (charcode & 0x3f));
                    }
                }
                return new Uint8Array(utf8);
            };
        """)
        
        let decodeFunction: @convention(block) (JSValue) -> String? = { jsValue in
            
            // Handle Uint8Array
            if let uint8Array = jsValue.toObject() {
                if let buffer = uint8Array as? [UInt8] {
                    return String(bytes: buffer, encoding: .utf8)
                }
                
                if let lengthValue = jsValue.objectForKeyedSubscript("length"),
                   let length = lengthValue.toNumber()?.intValue {
                    var bytes: [UInt8] = []
                    for i in 0..<length {
                        if let byte = jsValue.objectForKeyedSubscript(i)?.toNumber()?.uint8Value {
                            bytes.append(byte)
                        }
                    }
                    return String(bytes: bytes, encoding: .utf8)
                }
            }
            
            return nil
        }
        
        context.setObject(decodeFunction, forKeyedSubscript: "_swiftDecode" as NSString)
        
        context.evaluateScript("""
            var TextDecoder = function(encoding) {
                this.encoding = encoding || 'utf-8';
            };
            
            TextDecoder.prototype.decode = function(bytes) {
                if (!bytes || bytes.length === 0) return '';
                
                // Convert Uint8Array to array for Swift bridge
                var array = [];
                if (bytes.constructor.name === 'Uint8Array') {
                    for (var i = 0; i < bytes.length; i++) {
                        array.push(bytes[i]);
                    }
                } else {
                    array = bytes;
                }
                
                return _swiftDecode(array);
            };
        """)
    }
}

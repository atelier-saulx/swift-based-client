//
//  BasedBridge+Blob.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 09/12/2025.
//

import Foundation
import JavaScriptCore

// Simple Blob polyfill for JSContext

func addBlobPolyfill(with context: JSContext) {
    context.evaluateScript("""
        globalThis.Blob = class Blob {
            constructor(parts = [], options = {}) {
                this.parts = parts;
                this.type = options.type || '';
                this.size = 0;
                
                for (const part of parts) {
                    if (part instanceof Uint8Array || part instanceof ArrayBuffer) {
                        this.size += part.byteLength || part.length;
                    } else if (typeof part === 'string') {
                        this.size += part.length;
                    }
                }
                
                // Store as Uint8Array
                this._data = new Uint8Array(this.size);
                let offset = 0;
                
                for (const part of parts) {
                    if (part instanceof Uint8Array) {
                        this._data.set(part, offset);
                        offset += part.length;
                    } else if (part instanceof ArrayBuffer) {
                        this._data.set(new Uint8Array(part), offset);
                        offset += part.byteLength;
                    } else if (typeof part === 'string') {
                        for (let i = 0; i < part.length; i++) {
                            this._data[offset++] = part.charCodeAt(i);
                        }
                    }
                }
            }
            
            arrayBuffer() {
                return Promise.resolve(this._data.buffer);
            }
            
            text() {
                let str = '';
                for (let i = 0; i < this._data.length; i++) {
                    str += String.fromCharCode(this._data[i]);
                }
                return Promise.resolve(str);
            }
            
            slice(start = 0, end = this.size, contentType = '') {
                const sliced = this._data.slice(start, end);
                return new Blob([sliced], { type: contentType });
            }
        };
    """)
}

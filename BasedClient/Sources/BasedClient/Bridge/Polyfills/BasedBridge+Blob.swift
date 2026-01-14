//
//  BasedBridge+Blob.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 09/12/2025.
//

import Foundation
import JavaScriptCore


extension BasedBridge {
    
    func addBlobPolyfill(with context: JSContext) {
        context.evaluateScript("""
            (function() {
                
                globalThis.Blob = class Blob {
                    constructor(parts = [], options = {}) {
                        this.type = options.type || '';
                        this.size = 0;
                        
                        for (const part of parts) {
                            if (part instanceof Blob) {
                                this.size += part.size;
                            } else if (part instanceof Uint8Array || part instanceof ArrayBuffer) {
                                this.size += part.byteLength || part.length;
                            } else if (typeof part === 'string') {
                                const encoder = new TextEncoder();
                                this.size += encoder.encode(part).length;
                            }
                        }
                        
                        this._data = new Uint8Array(this.size);
                        let offset = 0;
                        
                        for (const part of parts) {
                            if (part instanceof Blob) {
                                if (part._data) {
                                    this._data.set(part._data, offset);
                                    offset += part._data.length;
                                }
                            } else if (part instanceof Uint8Array) {
                                this._data.set(part, offset);
                                offset += part.length;
                            } else if (part instanceof ArrayBuffer) {
                                this._data.set(new Uint8Array(part), offset);
                                offset += part.byteLength;
                            } else if (typeof part === 'string') {
                                const encoder = new TextEncoder();
                                const encoded = encoder.encode(part);
                                this._data.set(encoded, offset);
                                offset += encoded.length;
                            }
                        }
                    }
                    
                    arrayBuffer() {
                        return Promise.resolve(this._data.buffer);
                    }
                    
                    text() {
                        const decoder = new TextDecoder();
                        return Promise.resolve(decoder.decode(this._data));
                    }
                    
                    slice(start = 0, end = this.size, contentType = '') {
                        console.log('[Blob] slice(', start, ',', end, ')');
                        const sliced = this._data.slice(start, end);
                        const blob = new Blob([sliced], { type: contentType });
                        
                        console.log('[Blob] Sliced blob methods:', {
                            arrayBuffer: typeof blob.arrayBuffer,
                            stream: typeof blob.stream,
                            slice: typeof blob.slice,
                            _data: !!blob._data,
                            size: blob.size
                        });
                        
                        return blob;
                    }
                    
                    stream() {
                        
                        const data = this._data;
                        let position = 0;
                        const chunkSize = 65536;
                        
                        const reader = {
                            async read() {                                
                                if (position >= data.length) {
                                    return { done: true, value: undefined };
                                }
                                
                                const end = Math.min(position + chunkSize, data.length);
                                const chunk = data.slice(position, end);
                                position = end;
                                
                                return { done: false, value: chunk };
                            },
                            
                            releaseLock() {
                                console.log('[Stream reader] releaseLock()');
                            },
                            
                            async cancel() {
                                console.log('[Stream reader] cancel()');
                            }
                        };
                        
                        return {
                            getReader() {
                                return reader;
                            }
                        };
                    }
                };
                
                globalThis.File = class File extends Blob {
                    constructor(parts, name, options = {}) {
                        super(parts, options);
                        this.name = name;
                        this.lastModified = options.lastModified || Date.now();
                    }
                };
        
                globalThis.FileReader = class FileReader {
                    constructor() {
                        this.result = null;
                        this.error = null;
                        this.readyState = 0; // EMPTY
                        this._listeners = {};
                    }
                    
                    addEventListener(type, callback) {
                        if (!this._listeners[type]) {
                            this._listeners[type] = [];
                        }
                        this._listeners[type].push(callback);
                    }
                    
                    removeEventListener(type, callback) {
                        if (!this._listeners[type]) return;
                        this._listeners[type] = this._listeners[type].filter(cb => cb !== callback);
                    }
                    
                    _dispatch(type) {
                        if (this._listeners[type]) {
                        const event = { target: this };
                        this._listeners[type].forEach((cb, i) => {
                            try {
                                cb(event);
                            } catch (e) {
                                console.error('[FileReader] Listener', i, 'error:', e.message, e.stack);
                            }
                        });
                    }}
                    
                    readAsArrayBuffer(blob) {
                        this.readyState = 1;
                        
                        Promise.resolve().then(() => {
                        try {
                            if (blob && blob._data) {
                                const copy = new Uint8Array(blob._data).buffer;
                                this.result = copy;
                            } else {
                                this.result = new ArrayBuffer(0);
                            }
                            this.readyState = 2;
                            this._dispatch('loadend');
                        } catch (e) {
                            this.error = e;
                            this.readyState = 2;
                            this._dispatch('error');
                            this._dispatch('loadend');
                        }
                        });
                    }
                    
                    readAsText(blob, encoding = 'utf-8') {
                        console.log('[FileReader] readAsText called');
                        this.readyState = 1;
                        
                        Promise.resolve().then(() => {
                            try {
                                if (blob && blob._data) {
                                    const decoder = new TextDecoder(encoding);
                                    this.result = decoder.decode(blob._data);
                                } else {
                                    this.result = '';
                                }
                                this.readyState = 2;
                                this._dispatch('loadend');
                            } catch (e) {
                                this.error = e;
                                this.readyState = 2;
                                this._dispatch('error');
                                this._dispatch('loadend');
                            }
                        });
                    }
                    
                    readAsDataURL(blob) {
                        console.log('[FileReader] readAsDataURL called');
                        this.readyState = 1;
                        
                        Promise.resolve().then(() => {
                            try {
                                if (blob && blob._data) {
                                    // Simple base64 encoding
                                    let binary = '';
                                    for (let i = 0; i < blob._data.length; i++) {
                                        binary += String.fromCharCode(blob._data[i]);
                                    }
                                    const base64 = btoa(binary);
                                    const mimeType = blob.type || 'application/octet-stream';
                                    this.result = 'data:' + mimeType + ';base64,' + base64;
                                } else {
                                    this.result = 'data:;base64,';
                                }
                                this.readyState = 2;
                                this._dispatch('loadend');
                            } catch (e) {
                                this.error = e;
                                this.readyState = 2;
                                this._dispatch('error');
                                this._dispatch('loadend');
                            }
                        });
                    }
                    
                    abort() {
                        console.log('[FileReader] abort called');
                        this.readyState = 2;
                        this._dispatch('abort');
                    }
                };
                
                console.log('[Based] FileReader polyfill installed');
                
            })();
        """)
    }
}

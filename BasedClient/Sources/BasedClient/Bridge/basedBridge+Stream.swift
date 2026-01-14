//
//  basedBridge+Stream.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 08/01/2026.
//

import Foundation
import JavaScriptCore

extension BasedBridge {
    
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
        
        return try await withCheckedThrowingContinuation { continuation in
            
            let streamId = UUID().uuidString.replacingOccurrences(of: "-", with: "")
            let bytesKey = "__streamBytes_\(streamId)"
            let bytes = [UInt8](data)
            
            let script = """
            (function() {
                try {
                    const payload = JSON.parse('\(payload.escapedJSON)');                    
                    const bytes = globalThis['\(bytesKey)'];
                    
                    if (!bytes) {
                        throw new Error('Byte array not found');
                    }
                    
                    const uint8Array = new Uint8Array(bytes);
                    
                    const file = new File([uint8Array], '\(fileName)', {
                        type: '\(mimeType)',
                        lastModified: Date.now()
                    });
                    
                    const options = {
                        payload: payload,
                        contents: file,
                        fileName: '\(fileName)',
                        mimeType: '\(mimeType)',
                        extension: '\(`extension`)'
                    };
                    
                    const streamPromise = basedClient.stream('\(functionName)', options, (progress, bytesUploaded) => {
                        const validProgress = (typeof progress === 'number' && isFinite(progress)) ? progress : 0;
                        const validBytes = (typeof bytesUploaded === 'number' && isFinite(bytesUploaded)) ? Math.floor(bytesUploaded) : 0;
                        __onStreamProgress('\(streamId)', validProgress, validBytes);
                    });
                    
                    streamPromise.then(() => {
                        __onStreamComplete('\(streamId)');
                        delete globalThis['\(bytesKey)'];
                    }).catch((error) => {
                        __onStreamError('\(streamId)', error.message);
                        delete globalThis['\(bytesKey)'];
                    });
                    
                    return { success: true, streamId: '\(streamId)' };
                    
                } catch (error) {
                    delete globalThis['\(bytesKey)'];
                    return { success: false, error: error.message };
                }
            })()
            """
            
            getContext().setObject(bytes, forKeyedSubscript: bytesKey as NSString)
            
            let onProgressCallback: @convention(block) (String, Double, Double) -> Void = { sid, progress, bytes in
                guard sid == streamId else { return }
                
                let validProgress = progress.isNaN || progress.isInfinite ? 0.0 : progress
                let validBytes = bytes.isNaN || bytes.isInfinite ? 0 : Int(bytes)
                
                progressListener?(validProgress, validBytes)
            }
            
            let onCompleteCallback: @convention(block) (String) -> Void = { sid in
                guard sid == streamId else { return }
                continuation.resume(returning: ())
            }
            
            let onErrorCallback: @convention(block) (String, String) -> Void = { sid, errorMsg in
                guard sid == streamId else { return }
                continuation.resume(throwing: BasedError.jsError(errorMsg))
            }
            
            getContext().setObject(onProgressCallback, forKeyedSubscript: "__onStreamProgress" as NSString)
            getContext().setObject(onCompleteCallback, forKeyedSubscript: "__onStreamComplete" as NSString)
            getContext().setObject(onErrorCallback, forKeyedSubscript: "__onStreamError" as NSString)
            
            guard let result = getContext().evaluateScript(script) else {
                getContext().setObject(nil, forKeyedSubscript: bytesKey as NSString)
                continuation.resume(throwing: BasedError.jsError("Script evaluation failed"))
                return
            }
            
            guard result.objectForKeyedSubscript("success")?.toBool() == true else {
                let error = result.objectForKeyedSubscript("error")?.toString() ?? "Unknown error"
                getContext().setObject(nil, forKeyedSubscript: bytesKey as NSString)
                continuation.resume(throwing: BasedError.jsError(error))
                return
            }
        }
    }
}

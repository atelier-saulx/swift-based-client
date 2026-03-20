//
//  StreamTypes.swift
//  swift-based-client
//
//  Created by Alexander van der Werff on 08/01/2026.
//

import Foundation


public struct StreamOptions: Sendable {
    let payloadJSON: String?
    let contents: StreamContents
    let fileName: String
    let mimeType: String
    let `extension`: String
    
    public enum StreamContents: Sendable {
        case file(URL)
        case data(Data)
        case string(String)
    }
    
    public init<P: Encodable & Sendable>(
        payload: P,
        contents: StreamContents,
        fileName: String? = nil,
        mimeType: String? = nil,
        extension: String? = nil
    ) throws {
    
        let encoder = JSONEncoder()
        let data = try encoder.encode(payload)
        self.payloadJSON = String(data: data, encoding: .utf8)
        
        self.contents = contents
        
        switch contents {
        case .file(let url):
            self.fileName = fileName ?? url.lastPathComponent
            self.extension = `extension` ?? url.pathExtension
            self.mimeType = mimeType ?? Self.mimeType(for: url.pathExtension)
            
        case .data:
            self.fileName = fileName ?? "data"
            self.extension = `extension` ?? ""
            self.mimeType = mimeType ?? "application/octet-stream"
            
        case .string:
            self.fileName = fileName ?? "text"
            self.extension = `extension` ?? "txt"
            self.mimeType = mimeType ?? "text/plain"
        }
    }
    
    public init(
        contents: StreamContents,
        fileName: String? = nil,
        mimeType: String? = nil,
        extension: String? = nil
    ) {
        self.payloadJSON = nil
        self.contents = contents
        
        switch contents {
        case .file(let url):
            self.fileName = fileName ?? url.lastPathComponent
            self.extension = `extension` ?? url.pathExtension
            self.mimeType = mimeType ?? Self.mimeType(for: url.pathExtension)
            
        case .data:
            self.fileName = fileName ?? "data"
            self.extension = `extension` ?? ""
            self.mimeType = mimeType ?? "application/octet-stream"
            
        case .string:
            self.fileName = fileName ?? "text"
            self.extension = `extension` ?? "txt"
            self.mimeType = mimeType ?? "text/plain"
        }
    }
    
    private static func mimeType(for ext: String) -> String {
        switch ext.lowercased() {
        case "txt": return "text/plain"
        case "json": return "application/json"
        case "html": return "text/html"
        case "jpg", "jpeg": return "image/jpeg"
        case "png": return "image/png"
        case "pdf": return "application/pdf"
        case "zip": return "application/zip"
        case "mp4": return "video/mp4"
        default: return "application/octet-stream"
        }
    }
}

public typealias StreamProgressListener = @Sendable (Double, Int) -> Void

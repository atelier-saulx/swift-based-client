//
//  ContentView.swift
//  SwiftBasedClient-Example
//
//  Created by Alexander van der Werff on 07/11/2025.
//

import SwiftUI
import BasedClient
import UniformTypeIdentifiers

nonisolated struct LoginPayload: Codable, Sendable {
    let email: String
    let password: String
    let apiVersion: Int
}

nonisolated struct UserSessionResponse: Codable, Sendable {
    let token: String
    let refreshToken: String
    let userId: String
}

nonisolated struct CounterResponse: Codable, Sendable {
    let count: Int
}

nonisolated struct CounterQuery: Codable, Sendable {}

nonisolated struct UploadPayload: Codable, Sendable {
    let description: String
    let timestamp: Date
}

@Observable
class ViewModel {
    var client: BasedClient?
    var authState: AuthState?
    var error: String?
    var isLoading = false
    var count: Int?
    var isStreaming = false
    private var streamTask: Task<Void, Never>?
    
    // Upload state
    var uploadProgress: Double = 0
    var uploadBytesTransferred: Int = 0
    var isUploading = false
    var uploadSuccess: Bool?
    var showFilePicker = false
    
    init() {
        Task {
            await setupClient()
        }
    }
    
    func setupClient() async {
        do {
            let client = try await Based(basedOpts: BasedOpts.url("ws://localhost:61808"))
            self.client = client
            
            if let state = try await client.authState() {
                self.authState = state
                print("Auth state:", state)
            } else {
                print("No auth state")
            }
        } catch {
            self.error = error.localizedDescription
            print("Error:", error)
        }
    }
    
    func login() async {
        guard let client else { return }
        
        isLoading = true
        defer { isLoading = false }
        
        do {
            let authState = AuthState(
                token: "token",
                persistent: true,
                refreshToken: "token",
                userId: "id"
            )
            
            try await client.setAuthState(state: authState)
            self.authState = authState
            self.error = nil
            
            print("Logged in:", authState.userId)
        } catch {
            self.error = error.localizedDescription
            print("Login error:", error)
        }
    }
    
    func startCount() {
        guard let client else { return }
        
        streamTask?.cancel()
        
        isStreaming = true
        
        streamTask = Task {
            do {
                let stream: AsyncThrowingStream<CounterResponse, Error> = try await client.queryStream(
                    "counter",
                    payload: CounterQuery()
                )
                
                for try await response in stream {
                    self.count = response.count
                    print("Counter update:", response.count)
                }
                
                isStreaming = false
            } catch {
                self.error = error.localizedDescription
                self.isStreaming = false
                print("Stream error:", error)
            }
        }
    }
    
    func stopCount() {
        streamTask?.cancel()
        streamTask = nil
        isStreaming = false
    }
    
    func uploadFile(_ url: URL) async {
        await MainActor.run {
            isUploading = true
            uploadProgress = 0
        }
        
        defer {
            Task { @MainActor in
                isUploading = false
            }
        }
        
        do {
            let options = try StreamOptions(
                payload: ["timestamp": Date().timeIntervalSince1970],
                contents: .file(url)
            )
            
            try await client?.stream(
                "file-upload",
                options: options,
                progressListener: { [weak self] progress, bytes in
                    Task {  @MainActor [weak self] in
                        self?.uploadProgress = progress
                    }
                }
            )
            
            print("Upload complete!")
        } catch {
            print("Upload failed:", error)
        }
    }
    
    func createTestFile() -> URL {
        let tempDir = FileManager.default.temporaryDirectory
        let fileURL = tempDir.appendingPathComponent("test-file.bin")
        
        let targetSize = 1_048_576 // 1MB
        
        // Generate random data
        var data = Data(count: targetSize)
        data.withUnsafeMutableBytes { buffer in
            guard let baseAddress = buffer.baseAddress else { return }
            arc4random_buf(baseAddress, targetSize)
        }
        
        try? data.write(to: fileURL)
        
        print("Created test file: \(fileURL.path)")
        print("File size: \(data.count) bytes")
        
        return fileURL
    }
    
    func createTestImage() -> URL? {
        let tempDir = FileManager.default.temporaryDirectory
        let imageURL = tempDir.appendingPathComponent("test-image.png")
        
        let size = CGSize(width: 300, height: 300)
        let renderer = UIGraphicsImageRenderer(size: size)
        let image = renderer.image { context in
            UIColor.systemBlue.setFill()
            context.fill(CGRect(origin: .zero, size: size))
            
            UIColor.white.setFill()
            let rect = CGRect(x: 50, y: 50, width: 2000, height: 2000)
            context.fill(rect)
        }
        
        if let data = image.pngData() {
            try? data.write(to: imageURL)
            return imageURL
        }
        
        return nil
    }
}

struct ContentView: View {
    @State private var viewModel = ViewModel()
    
    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                if let authState = viewModel.authState {
                    VStack(spacing: 4) {
                        Text("Authenticated")
                            .font(.headline)
                            .foregroundColor(.green)
                        Text("User: \(authState.userId)")
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }
                } else {
                    VStack(spacing: 4) {
                        Text("Not authenticated")
                            .font(.headline)
                            .foregroundColor(.orange)
                        if let error = viewModel.error {
                            Text(error)
                                .font(.caption)
                                .foregroundColor(.red)
                        }
                    }
                }
                
                Divider()
                
                if let count = viewModel.count {
                    VStack(spacing: 8) {
                        Text("Counter")
                            .font(.caption)
                            .foregroundColor(.secondary)
                        
                        Text("\(count)")
                            .font(.system(size: 60, weight: .bold, design: .rounded))
                            .foregroundColor(viewModel.authState != nil ? .green : .red)
                        
                        if viewModel.isStreaming {
                            Text("Live updating...")
                                .font(.caption)
                                .foregroundColor(viewModel.authState != nil ? .green : .red)
                        }
                    }
                }
                
                Divider()
                
                VStack(spacing: 12) {
                    Text("File Upload")
                        .font(.headline)
                    
                    if viewModel.isUploading {
                        VStack(spacing: 8) {
                            ProgressView(value: viewModel.uploadProgress) {
                                Text("Uploading...")
                                    .font(.caption)
                            }
                            
                            Text("\(Int(viewModel.uploadProgress * 100))% - \(formatBytes(viewModel.uploadBytesTransferred))")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                    } else if let success = viewModel.uploadSuccess {
                        HStack {
                            Image(systemName: success ? "checkmark.circle.fill" : "xmark.circle.fill")
                            Text(success ? "Upload successful!" : "Upload failed")
                        }
                        .foregroundColor(success ? .green : .red)
                        .font(.caption)
                    }
                    
                    Button {
                        Task {
                            let fileURL = viewModel.createTestFile()
                            await viewModel.uploadFile(fileURL)
                        }
                    } label: {
                        HStack {
                            Image(systemName: "doc.badge.plus")
                            Text("Upload Generated File")
                        }
                    }
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.orange)
                    .foregroundColor(.white)
                    .cornerRadius(12)
                    .disabled(viewModel.isUploading || viewModel.client == nil)
                    
                    Button {
                        Task {
                            if let imageURL = viewModel.createTestImage() {
                                await viewModel.uploadFile(imageURL)
                            }
                        }
                    } label: {
                        HStack {
                            Image(systemName: "photo.badge.plus")
                            Text("Upload Generated Image")
                        }
                    }
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.cyan)
                    .foregroundColor(.white)
                    .cornerRadius(12)
                    .disabled(viewModel.isUploading || viewModel.client == nil)
                }
                
                Divider()
                
                // Action Buttons
                if viewModel.authState == nil && !viewModel.isStreaming {
                    Button {
                        Task {
                            await viewModel.login()
                        }
                    } label: {
                        if viewModel.isLoading {
                            ProgressView()
                                .tint(.white)
                        } else {
                            Text("Login")
                        }
                    }
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(12)
                    .disabled(viewModel.isLoading)
                }
                
                if viewModel.isStreaming {
                    Button {
                        viewModel.stopCount()
                    } label: {
                        HStack {
                            Image(systemName: "stop.fill")
                            Text("Stop Counter")
                        }
                    }
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.red)
                    .foregroundColor(.white)
                    .cornerRadius(12)
                } else {
                    Button {
                        viewModel.startCount()
                    } label: {
                        HStack {
                            Image(systemName: "play.fill")
                            Text("Start Counter Stream")
                        }
                    }
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(viewModel.authState != nil ? Color.green : Color.red)
                    .foregroundColor(.white)
                    .cornerRadius(12)
                    .disabled(viewModel.client == nil)
                }
            }
            .padding()
        }
        .fileImporter(
            isPresented: $viewModel.showFilePicker,
            allowedContentTypes: [.item],
            allowsMultipleSelection: false
        ) { result in
            switch result {
            case .success(let urls):
                if let url = urls.first {
                    Task {
                        await viewModel.uploadFile(url)
                    }
                }
            case .failure(let error):
                viewModel.error = error.localizedDescription
            }
        }
    }
    
    private func formatBytes(_ bytes: Int) -> String {
        let formatter = ByteCountFormatter()
        formatter.countStyle = .file
        return formatter.string(fromByteCount: Int64(bytes))
    }
}

#Preview {
    ContentView()
}

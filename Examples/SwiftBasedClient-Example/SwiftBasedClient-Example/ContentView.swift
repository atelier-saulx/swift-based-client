//
//  ContentView.swift
//  SwiftBasedClient-Example
//
//  Created by Alexander van der Werff on 07/11/2025.
//

import SwiftUI
import BasedClient

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

@Observable
class ViewModel {
    var client: BasedClient?
    var authState: AuthState?
    var error: String?
    var isLoading = false
    var count: Int?
    var isStreaming = false
    private var streamTask: Task<Void, Never>?
    
    init() {
        Task {
            await setupClient()
        }
    }
    
    func setupClient() async {
        do {
            let client = try await Based(basedOpts: BasedOpts.url("ws://localhost:64838"))
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
            let result: UserSessionResponse = try await client.call(
                "createUserSession",
                payload: LoginPayload(
                    email: "test@example.com",
                    password: "password",
                    apiVersion: 1
                )
            )
            
            let authState = AuthState(
                token: result.token,
                persistent: true,
                refreshToken: result.refreshToken,
                userId: result.userId
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
}

struct ContentView: View {
    @State private var viewModel = ViewModel()
    
    var body: some View {
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
            
            Spacer()
            
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
}

#Preview {
    ContentView()
}

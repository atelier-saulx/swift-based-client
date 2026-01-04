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

@Observable
class ViewModel {
    var client: BasedClient?
    var authState: AuthState?
    var error: String?
    var isLoading = false
    
    init() {
        Task {
            await setupClient()
        }
    }
    
    func setupClient() async {
        do {
            // requires local based server
            let client = try await Based(basedOpts: BasedOpts.url("ws://localhost:1234"))
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
                userId: result.userId,
            )
            
            try await client.setAuthState(state: authState)
            self.authState = authState
            
            print("Logged in:", authState.userId)
        } catch {
            self.error = error.localizedDescription
            print("Login error:", error)
        }
    }
}

struct ContentView: View {
    @State private var viewModel = ViewModel()
    
    var body: some View {
        VStack(spacing: 20) {
            if let authState = viewModel.authState {
                Text("Authenticated")
                    .font(.headline)
                Text("User: \(authState.userId)")
                Text("Token: \(authState.token)")
                    .font(.caption)
                    .lineLimit(1)
            } else if let error = viewModel.error {
                Text("Error")
                    .font(.headline)
                Text(error)
                    .font(.caption)
            } else {
                Text("Not authenticated")
                    .foregroundColor(.secondary)
                
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
        }
        .padding()
    }
}

#Preview {
    ContentView()
}

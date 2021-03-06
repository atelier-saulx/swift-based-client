//
//  ContentView.swift
//  BasicExample
//
//  Created by Alexander van der Werff on 29/08/2021.
//

import SwiftUI
import BasedClient



class ViewModel: ObservableObject {
    
    @Published var ready = false
    @Published var statusText = "Updating schema..."

    func setup() async {
        try? await Current.client.configure()
        Task { @MainActor in
            statusText = "Preparing..."
        }
        try? await Current.client.prepare()
        Task { @MainActor in
            statusText = "Setup data..."
        }
        try? await Current.client.fillDatabase()
        Task { @MainActor in
            ready = true
        }
    }
}



struct ContentView: View {
    
    @ObservedObject private var viewModel = ViewModel()
    
    var body: some View {
        if viewModel.ready {
            TypeChooserView()
        } else {
            ProgressView {
                Text(viewModel.statusText)
            }
            .onAppear {
                Task { await viewModel.setup() }
            }
        }
    }
    
}

struct ContentView_Previews: PreviewProvider {
    
    static var previews: some View {
        ContentView()
    }
}

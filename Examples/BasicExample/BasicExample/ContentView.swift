//
//  ContentView.swift
//  BasicExample
//
//  Created by Alexander van der Werff on 29/08/2021.
//

import SwiftUI
import BasedClient
import Foundation

public struct AirHubAsyncSequence<Element>: AsyncSequence {
    public final class Iterator: AsyncIteratorProtocol {
        private var produceNext: () async throws -> Element?
        
        init<Upstream: AsyncIteratorProtocol>(upstream: Upstream) where Element == Upstream.Element {
            var mutableCopy = upstream
            produceNext = {
                try await mutableCopy.next()
            }
        }
        
        public func next() async throws -> Element? {
            guard !Task.isCancelled else {
                return nil
            }
            return try await produceNext()
        }
    }
    
    private let makeIterator: () -> Iterator
    
    init<Upstream: AsyncSequence>(upstream: Upstream) where Element == Upstream.Element {
        makeIterator = {
            Iterator(upstream: upstream.makeAsyncIterator())
        }
    }
    
    public func makeAsyncIterator() -> Iterator {
        makeIterator()
    }
}

extension AsyncSequence {
    func asAirHubAsyncSequence() -> AirHubAsyncSequence<Element> {
        .init(upstream: self)
    }
}

class ViewModel: ObservableObject {
    
    @Published var ready = false
    @Published var statusText = "Updating schema..."
    
    let based = Based.init(configuration: .init(org: "airhub", project: "airhub", env: "edge"))
    
//    let test: [String: Int] = based.subscribe(name: "counter")
//
//    func getCounter() async {
//        for await a in based.subscribe(name: "counter") {
//            await MainActor.run {
//
//            }
//        }
//    }
    
    var sequence: AirHubAsyncSequence<[String: Int]>!
    var task: Task<(), Error>?

    @MainActor
    func setup() async {
        
        sequence = based.subscribe(name: "counter").asAirHubAsyncSequence()
        task = Task {
            do {
                for try await c in sequence {
                    print(c)
                }
            } catch {
                print(error)
            }
        }
        
//        do {
//            let test: [String: Int] = try await based.get(name: "counter")
//            print(test)
//            
//            //            let schema = try await based.schema()
//            //            print(schema)
//        } catch {
//            print(error)
//        }
//        
//        sequence = nil
        Task.detached {
            try await Task.sleep(nanoseconds: UInt64(3 * 1_000_000_000))
            self.task?.cancel()
        }
        
//        - counter, an observable that fires every second
//        - crasher, a NON-observable that fires an error
//        - obsCrasher, an observable that crashes

    
        
        
//        try? await Current.client.configure()
//        Task { @MainActor in
//            statusText = "Preparing..."
//        }
//        try? await Current.client.prepare()
//        Task { @MainActor in
//            statusText = "Setup data..."
//        }
//        try? await Current.client.fillDatabase()
//        Task { @MainActor in
//            ready = true
//        }
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

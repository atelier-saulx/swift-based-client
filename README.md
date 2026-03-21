# BasedClient
 
A Swift native client for [Based](https://github.com/atelier-saulx/based).
 
## Installation
 
Add BasedClient to your project via Swift Package Manager:
 
```swift
dependencies: [
    .package(url: "https://github.com/atelier-saulx/swift-based-client", from: "0.7.2")
]
```
 
Or in Xcode: **File → Add Package Dependencies** and enter the repository URL.
 
### Requirements
 
- iOS 17+
- macOS 14+
- Swift 6.2+
 
## Usage
 
### Connect
 
```swift
let client = try await Based(basedOpts: BasedOpts.url("ws://localhost:1234"))
```
 
Or connect using environment options:
 
```swift
let client = try await BasedOpts.options(
    options: BasedOpts.Options(env: "env", org: "org", project: "prj")
)
```
 
### Query
 
```swift
do {
    let response: Response = try await client.query(name: "name")
    print(response)
} catch {
    print(error)
}
```
 
### Call a function
 
```swift
do {
    let response: Response = try await client.call(
        "function-name",
        payload: Payload(..)
    )
} catch {
    print(error)
}
```
 
### Subscribe
 
```swift
do {
    let stream: AsyncThrowingStream<Response, Error> = try await client.queryStream(
        "some-list",
        payload: Payload(...)
    )
    for try await item in stream {
        print(item)
    }
} catch {
    print(error)
}
```
 
## Examples
 
Check out the [example app](Examples/Simple) to see BasedClient in action.
 
To run the example, open `BasedClient.xcworkspace` in Xcode and select the example app scheme.
 
## License
 
MIT

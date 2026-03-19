# Based Swift client

Swift native client for https://github.com/atelier-saulx/based-core/tree/main/docs
=======
# Usage

## Setup
```
let client = try await Based(basedOpts: BasedOpts.url("ws://localhost:1234"))

or

let client = try await BasedOpts.options(options: BasedOpts.Options(env: "env", org: "org", project: "prj"))
```
## Query once
```
do {
  let response: Response = try await client.query(name: "name")
  print(response)
} catch {
  print(error)
}
```
## Call
```
do {
let response: Response = try await client.call(
                "function-name",
                payload: Payload(..)
              )
} catch {
  print(error)
}
```
## Subscribe
```
do {
  let response: AsyncThrowingStream<Response, Error> = try await client.queryStream("some-list", payload: Payload(...)
  for try await item in response {
      print(item)
  }
} catch {
  print(error)
}
```

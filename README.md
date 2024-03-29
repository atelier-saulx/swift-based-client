# Based Swift client

Swift native client for https://github.com/atelier-saulx/based-core/tree/main/docs
=======
# Usage

## Config
```
let client = Based(config: BasedConfig(env: "env", project: "projectName", org: "organization"))
```
## Get
```
        do {
            let result: [String: Int] = try await based.get(name: "functionName")
            print(result)
        } catch {
            print(error)
        }
```
## Delete
```
let res = try await client.delete(id: "root")
```
## Set
```
let res = try await client.set(query: BasedQuery.query(.field("type", "thing"), .field("name", name)))
```
## Observe
```
    var sequence: AsyncThrowingStream<[String: Int]>!
    var task: Task<(), Error>?
    
    ...
        
    sequence = based.subscribe(name: "functionName")
    task = Task {
        do {
            for try await c in sequence {
                print(c)
            }
        } catch {
            print(error)
        }
    }
    
    ...
    task.cancel()
    task = nil
```

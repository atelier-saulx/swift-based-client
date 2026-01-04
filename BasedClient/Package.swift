// swift-tools-version: 6.2
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "swift-based-client",
    platforms: [
        .iOS(.v17),
        .macOS(.v14)
    ],
    products: [
        .library(
            name: "BasedClient",
            type: .dynamic,
            targets: ["BasedClient"]
        ),
    ],
    targets: [
        .target(
            name: "BasedClient",
            resources: [
                .process("Resources")
            ],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency")
            ]
        ),
        .testTarget(
            name: "BasedClientTests",
            dependencies: ["BasedClient"]
        )
    ]
)

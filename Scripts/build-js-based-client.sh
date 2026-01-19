#!/bin/bash
# Build Based Client JS Bundle for Swift Package

set -e

echo "Building Based Client JS Bundle for Swift Package"
echo "===================================================="
echo ""

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PACKAGE_ROOT="$( cd "$SCRIPT_DIR/../BasedClient" && pwd )"
TEMP_DIR="$PACKAGE_ROOT/.build-temp"
RESOURCES_DIR="$PACKAGE_ROOT/Sources/BasedClient/Resources"

echo "Package root: $PACKAGE_ROOT"
echo "Resources dir: $RESOURCES_DIR"
echo ""

if [ -d "$TEMP_DIR" ]; then
    echo "Cleaning up existing temp directory.."
    rm -rf "$TEMP_DIR"
fi

mkdir -p "$TEMP_DIR"
cd "$TEMP_DIR"

if [ ! -f "package.json" ]; then
    echo "Creating package.json..."
    cat > package.json << 'EOF'
{
  "type": "module",
  "dependencies": {
    "@based/client": "latest"
  },
  "devDependencies": {
    "esbuild": "^0.19.0"
  }
}
EOF
    echo "Install Based client"
    npm install
fi


echo ""
echo "Creating bundler..."
cat > bundle.js << 'EOF'
import esbuild from 'esbuild';
import path from 'path';

async function bundle() {
  try {
    console.log('🔨 Bundling Based Client...\n');

    const result = await esbuild.build({
      entryPoints: ['./node_modules/@based/client/dist/src/index.js'],
      bundle: true,
      outfile: './based-client.js',
      platform: 'browser',
      format: 'iife',
      globalName: 'Based',
      target: 'es2021',
      minify: true,
      keepNames: true,
      treeShaking: true,
      metafile: true
    });

    const size = (result.metafile.outputs['based-client.js'].bytes / 1024).toFixed(2);
    console.log(`Bundle created: ${size} KB\n`);

  } catch (error) {
    console.error('Build failed:', error.message);
    if (error.errors) {
      error.errors.forEach(err => {
        console.error(err.text);
        if (err.location) {
          console.error(`  at ${err.location.file}:${err.location.line}:${err.location.column}`);
        }
      });
    }
    process.exit(1);
  }
}

bundle();
EOF

echo "Building bundle..."
node bundle.js

echo ""
echo "Copying bundle to Swift package..."
mkdir -p "$RESOURCES_DIR"
cp based-client.js "$RESOURCES_DIR/"

BUNDLE_SIZE=$(ls -lh "$RESOURCES_DIR/based-client.js" | awk '{print $5}')

echo ""
echo "Bundle location: $RESOURCES_DIR/based-client.js"
echo "Bundle size: $BUNDLE_SIZE"
echo ""
echo "Cleaning up..."
cd "$PACKAGE_ROOT"
rm -rf "$TEMP_DIR"

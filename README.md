[![Build Status](https://travis-ci.org/Updater/rollup-plugin-peer-deps-external.svg?branch=master)](https://www.npmjs.com/package/rollup-plugin-peer-deps-external) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# Rollup Plugin Peer Deps External
Automatically externalize `peerDependencies` in a `rollup` bundle.

## Motivation
When bundling a library using [`rollup`](https://github.com/rollup/rollup), we generally want to keep from including  [`peerDependencies`](https://nodejs.org/en/blog/npm/peer-dependencies/) since they are expected to be  provided by the consumer of the library. By excluding these dependencies, we keep bundle size down and avoid bundling duplicate dependencies.

We can achieve this using the rollup [`external`](https://github.com/rollup/rollup/wiki/JavaScript-API#external) configuration option, providing it a list of the peer dependencies to exclude from the bundle. This plugin automates the process, automatically adding a library's `peerDependencies` to the `external` configuration.

## Module paths
This plugin is compatible with module path format applied by, for example, [`babel-plugin-lodash`](https://github.com/lodash/babel-plugin-lodash). For any module name in `peerDependencies`, all paths beginning with that module name will also be added to `external`.

E.g.: If `lodash` is in `peerDependencies`, an import of `lodash/map` would be added to externals.

## Installation
```bash
npm install --save-dev rollup-plugin-peer-deps-external
```

## Usage
```javascript
// Add to plugins array in rollup.config.js
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
  plugins: [
    // Preferably set as first plugin.
    peerDepsExternal(),
  ],
}
```

## Options
### packageJsonPath
If your `package.json` is not in the current working directory you can specify the path to the file
```javascript
// Add to plugins array in rollup.config.js
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
  plugins: [
    // Preferably set as first plugin.
    peerDepsExternal({
      packageJsonPath: 'my/folder/package.json'
    }),
  ],
}
```

### doIncludeDeps
Set to true if you want to exclude regular dependencies in addition to peer dependencies
```javascript

export default {
  plugins: [
    // Preferably set as first plugin.
    peerDepsExternal({
      doIncludeDeps: true
    }),
  ],
}
```


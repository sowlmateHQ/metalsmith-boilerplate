# metalsmith-gulp-boilerplate

## Usage

### Setup

```
$ npm install
$ gulp build-deps
```

### Develop

```
$ gulp

[20:27:43] Using gulpfile ~/Development/Projects/ultra-low/website-v3/gulpfile.js
[20:27:43] Starting 'css'...
[20:27:43] Starting 'js'...
[20:27:43] Finished 'js' after 108 μs
[20:27:43] Starting 'browser-sync'...
[20:27:43] Finished 'browser-sync' after 30 ms
[20:27:43] Finished 'css' after 94 ms
[20:27:43] Starting 'build-dev'...
[20:27:43] Finished 'build-dev' after 4.56 ms
[20:27:43] Starting 'default'...
[20:27:43] Finished 'default' after 54 μs
[BS] Access URLs:
 ----------------------------------------
       Local: http://localhost:3000
    External: http://192.168.178.144:3000
 ----------------------------------------
          UI: http://localhost:3001
 UI External: http://192.168.178.144:3001
 ----------------------------------------
[BS] Serving files from: ./dist
[BS] Reloading Browsers...
```

## Todo

- tryout yarn with lockfile
- try to get rid of these warnings

```
npm WARN deprecated gulp-minify-css@1.2.4: Please use gulp-clean-css
npm WARN deprecated node-uuid@1.4.8: Use uuid module instead
npm WARN deprecated minimatch@2.0.10: Please update to minimatch 3.0.2 or higher to avoid a RegExp DoS issue
npm WARN deprecated minimatch@0.2.14: Please update to minimatch 3.0.2 or higher to avoid a RegExp DoS issue
npm WARN deprecated graceful-fs@1.2.3: graceful-fs v3.0.0 and before will fail on node releases >= v7.0. Please update to graceful-fs@^4.0.0 as soon as possible. Use 'npm ls graceful-fs' to find it in the tree.
```

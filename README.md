# Develop

## Development Dependencies

Brew is used to install npm (nodejs).

```
brew install node
```

## Start Developing

```
npm install gulp -g
npm install
gulp build-deps
gulp
```

Now you should see Browsersync running:

```
[13:57:07] Using gulpfile ~/Development/Projects/ultra-low/website/gulpfile.js
[13:57:07] Starting 'css'...
[13:57:07] Starting 'js'...
[13:57:07] Finished 'js' after 106 μs
[13:57:07] Starting 'browser-sync'...
[13:57:07] Finished 'browser-sync' after 70 ms
[BS] Access URLs:
 ----------------------------------------
       Local: http://localhost:3000
    External: http://192.168.178.144:3000
 ----------------------------------------
          UI: http://localhost:3001
 UI External: http://192.168.178.144:3001
 ----------------------------------------
[BS] Serving files from: ./dist
```

## Optimize images

```
gulp --KRAKEN_API_KEY=$(KRAKEN_API_KEY) --KRAKEN_API_SECRET=$(KRAKEN_API_SECRET) images
```

## Validate Website

```
gulp.task("test-pages", function() {
    ...
});
```

With this task you can auto-validate each page built with Metalsmith.

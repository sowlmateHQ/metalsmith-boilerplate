# Metalsmith Boilerplate 😎🤘

## Create a new Project

[tbd]

## Develop

### Dependencies

You need `npm` installed.

```
$ brew install node
```

### Develop

```
$ npm install gulp -g
$ npm install
$ gulp
```

Now you should see Browsersync running and your website should be accessible [http://localhost:3000](http://localhost:3000):

```
[BS] Access URLs:
 ----------------------------------------
       Local: http://localhost:3000
    External: http://192.168.178.144:3000
 ----------------------------------------
          UI: http://localhost:3001
 UI External: http://192.168.178.144:3001
 ----------------------------------------
```

### Todo

- Document steps for a new project
    1. Clone Project
    2. Google Tag Manager
    3. Add Favicon
    4. ...
- Delete scss files in production
- SSL error checker gulp task
- Update used features in check-pages task

```
gulp.task('fetch-newest-analytics', function() {
    return download('https://www.google-analytics.com/analytics.js')
        .pipe(gulp.dest('assets/'));
});
```

### Resources

- https://github.com/macprog-guy/metalsmith-i18next
- https://github.com/axe312ger/metalsmith-sharp
- https://github.com/ExtraHop/metalsmith-seo-checker
- https://steveedson.co.uk/gulp/advanced-tasks/
- https://medium.com/@dimitrikoenig/scoring-100-on-googles-pagespeed-insights-with-jekyll-adcbbb229baf
- https://belenalbeza.com/building-a-static-multi-language-site-with-metalsmith-part-i
- https://belenalbeza.com/building-a-static-multi-language-site-with-metalsmith-part-ii/
- https://www.npmjs.com/package/metalsmith-fingerprint
- https://github.com/pjeby/gulpsmith
- https://github.com/majodev/metalsmith-data-markdown
- https://github.com/gchallen/code.metalsmith-linkcheck
- https://github.com/vitaliy-bobrov/metalsmith-disqus
- https://github.com/kalamuna/metalsmith-env
- https://github.com/expalmer/metalsmith-gist
- https://github.com/cusxio/metalsmith-github-markdown
- https://github.com/altano/metalsmith-npm
- https://github.com/mbanting/metalsmith-prismic
- https://github.com/mwishek/metalsmith-s3
- https://github.com/mikestopcontinues/metalsmith-validate
- https://github.com/majodev/metalsmith-word-count
- https://github.com/Waxolunist/metalsmith-writemetadata
- https://www.npmjs.com/package/gulp-remote-src
- https://github.com/ExtraHop/metalsmith-seo-checker
- https://github.com/ExtraHop/metalsmith-sitemap
- https://github.com/whymarrh/metalsmith-html-minifier
- https://www.npmjs.com/package/metalsmith-redirect
- https://www.npmjs.com/package/metalsmith-env
- https://github.com/dimitri-koenig/jekyll-gulp-optimizations
- https://www.npmjs.com/package/webcheck
- https://www.npmjs.com/package/http-status-check
- https://www.npmjs.com/package/metalsmith-page-titles
- https://github.com/hurrymaplelad/metalsmith-feed
- https://www.npmjs.com/package/metalsmith-assets
- https://www.npmjs.com/package/metalsmith-assets-improved
- https://www.npmjs.com/package/metalsmith-uglify
- https://github.com/mikestopcontinues/metalsmith-validate
- https://github.com/segmentio/metalsmith-build-date
- https://github.com/unstoppablecarl/metalsmith-navigation
- https://github.com/blakeembrey/metalsmith-pagination
- https://www.npmjs.com/package/metalsmith-contenthash

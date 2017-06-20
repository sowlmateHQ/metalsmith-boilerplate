'use strict';

var gulp = require('gulp');
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var globby = require('globby');
var sourcemaps = require('gulp-sourcemaps');
var checkPages = require('check-pages');
var connect = require('gulp-connect');
var del = require('del');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var jpegtran = require('imagemin-jpegtran');
var gifsicle = require('imagemin-gifsicle');
var metalsmith = require("./metalsmith.js");
var configuration = require("./config.json");

// ---------------------------------------------------------
// BUILD
// ---------------------------------------------------------

//
// Cleanup the build directory
// Build directory is also cleaned up by Metalsmith on each build run
//

gulp.task('clean', function () {
    return del([
        configuration.build.destination + '/**/*'
    ]);
});

//
// Build
//

gulp.task('build', ['css', 'js'], function () {
    metalsmith.build(function (err) {
        if (err) throw err;
    });
});

//
// Process SASS/CSS files
//

gulp.task('css', function () {
    return gulp.src(configuration.build.assets.css.globs)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCss())
        .pipe(concat(configuration.build.assets.css.minified))
        .pipe(gulp.dest(configuration.build.assets.bin));
});

//
// Process project JS files
//

gulp.task('js', function () {
    return gulp.src(configuration.build.assets.js.globs)
        .pipe(uglify())
        .pipe(concat(configuration.build.assets.js.minified))
        .pipe(gulp.dest(configuration.build.assets.bin));
});

//
// Process vendor JS files
// This is a separate task to decrease build time during development
//

gulp.task('deps', function () {
    return gulp.src(configuration.build.assets.vendor.globs)
        .pipe(uglify())
        .pipe(concat(configuration.build.assets.vendor.minified))
        .pipe(gulp.dest(configuration.build.assets.bin));
});

//
// Optimize images
// Images are optimized directly in destination folder
//

gulp.task('images', function () {
    return gulp.src([
        configuration.build.destination + '/**/*.jpg',
        configuration.build.destination + '/**/*.jpeg',
        configuration.build.destination + '/**/*.gif',
        configuration.build.destination + '/**/*.png'
    ])
        .pipe(imagemin({
            progressive: false,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant(), jpegtran(), gifsicle()]
        }))
        .pipe(gulp.dest(configuration.build.destination));
});

// ---------------------------------------------------------
// DEVELOPMENT
// ---------------------------------------------------------

//
// Default task
//

gulp.task('default', ['build-dev', 'browser-sync']);

//
// Build with live reload
//

gulp.task('build-dev', ['css', 'js'], function () {
    metalsmith.build(function (err) {
        if (err) throw err;
        browserSync.reload();
    });
});

//
// Time-saving synchronised browser testing
// https://browsersync.io/docs/gulp
//

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: configuration.build.destination
        }
    });

    gulp.watch(configuration.develop.watch, ['build-dev']);
});


// ---------------------------------------------------------
// Helpers
// ---------------------------------------------------------

//
// Checks various aspects of a web page for correctness
// https://github.com/DavidAnson/check-pages
//

gulp.task('check-pages', function () {
    connect.server({
        root: configuration.build.destination,
        port: 8888
    });

    var paths = globby.sync([configuration.build.destination + '/**/*.html']);

    var pageUrls = [];
    paths.forEach(function (path) {
        pageUrls.push(path.replace('./dist/', 'http://localhost:8888/'));
    });

    var options = {
        terse: true,
        summary: true,
        pageUrls: pageUrls,
        checkLinks: true,
        preferSecure: true,
        maxResponseTime: 1000,
        linksToIgnore: configuration.test.linksToIgnore
    };

    var callback = function (err, issueCount) {
        connect.serverClose();
        if (issueCount > 0) {
            throw new Error;
        }
    };

    checkPages(console, options, callback);
});

//
// Pings Google and Bing webmaster tools with current sitemap as argument
// Should be used after website was updated to invoke a fresh search engine crawl process
//

gulp.task('ping-sitemap', function (cb) {
    request('http://www.google.com/webmasters/tools/ping?sitemap=' + configuration.seo.sitemap);
    request('http://www.bing.com/webmaster/ping.aspx?siteMap=' + configuration.seo.sitemap);
    cb();
});

//
// Google Pagespeed
// Check "mobile" and "desktop" page speed of production site
//

gulp.task('pagespeed-mobile', function () {
    return psi.output(configuration.metadata.site.url, {
        nokey: 'true',
        strategy: 'mobile',
        threshold: 40
    })
});

gulp.task('pagespeed-desktop', function () {
    return psi.output(configuration.metadata.site.url, {
        nokey: 'true',
        strategy: 'desktop',
        threshold: 40
    })
});

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

var metalsmith = require("./metalsmith.js");
var configuration = require("./config.json");

//
// Default task
//

gulp.task('default', ['build-dev', 'browser-sync']);

//
// Build
//

gulp.task('build', ['css', 'js'], function () {
    metalsmith.build(function (err) {
        if (err) throw err;
    });
});

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
// Clean build directory
//

gulp.task('clean', function () {
    return del([
        configuration.build.destination + '/**/*'
    ]);
});

//
// Process SASS/CSS files
//

gulp.task('css', function () {
    return gulp.src(configuration.assets.globs.css)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCss())
        .pipe(concat(configuration.assets.minified.css))
        .pipe(gulp.dest(configuration.assets.bin.css));
});

//
// Process all JS files (build dependencies, scripts)
//

gulp.task('js', function () {
    // not implemented right now
});

//
// Process build dependencies
//

gulp.task('build-deps', function () {
    return gulp.src(configuration.assets.globs.vendor)
        .pipe(concat(configuration.assets.minified.vendor))
        .pipe(gulp.dest(configuration.assets.bin.js));
});

//
// Optimize images
//

gulp.task('images', function () {

});

//
// Browsersync
//

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: configuration.build.destination
        }
    });

    gulp.watch('./layouts/**/*.html', ['build-dev']);
    gulp.watch('./partials/**/*.html', ['build-dev']);
    gulp.watch(configuration.build.source + '/**/*.html', ['build-dev']);
    gulp.watch(configuration.build.source + '/_scss/**/*.scss', ['build-dev']);
    gulp.watch(configuration.build.source + '/css/**/*.css', ['build-dev']);
    gulp.watch(configuration.build.source + '/js/**/*.js', ['build-dev']);
});

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
        checkXhtml: true,
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

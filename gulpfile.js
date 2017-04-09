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
var through = require('through2');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');

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
// Browsersync
//

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: configuration.destination
        }
    });

    gulp.watch('./layouts/**/*.html', ['build-dev']);
    gulp.watch('./partials/**/*.html', ['build-dev']);
    gulp.watch(configuration.source + '/**/*.html', ['build-dev']);
    gulp.watch(configuration.source + '/_scss/**/*.html', ['build-dev']);
    gulp.watch(configuration.source + '/css/**/*.html', ['build-dev']);
    gulp.watch(configuration.source + '/js/**/*.html', ['build-dev']);
});

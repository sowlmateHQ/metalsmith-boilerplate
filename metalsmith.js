'use strict';

var layouts = require('metalsmith-layouts');
var Metalsmith = require('metalsmith');
var rootPath = require('metalsmith-rootpath');
var handlebars = require('handlebars');
var config = require('./config.json');

/**
 *  Export Metalsmith build to use with Gulp.
 *
 *  Metalsmith will look for a folder named `src` in `__dirname`.
 *  Use the source() method if you want to point Metalsmith to a different `src` folder/location.
 *  Then we set the destination folder using the destination() method.
 *
 *  Note that we are not calling the `Metalsmith.build()` here. We will invoke the build in gulpfile.js.
 */
module.exports = Metalsmith(__dirname)
    // Where shall we build?
    .destination(config.destination)
    // Process config
    .metadata(config.metadata)
    // Expose `rootPath` to each file
    .use(rootPath())
    // Process handlebars templates
    .use(layouts({
        engine: 'handlebars',
        directory: 'layouts',
        partials: 'partials'
    }));

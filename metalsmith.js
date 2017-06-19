'use strict';

var Metalsmith = require('metalsmith');
var env = require('metalsmith-env');
var rootPath = require('metalsmith-rootpath');
var permalinks = require('metalsmith-permalinks');
var layouts = require('metalsmith-layouts');
var sitemap = require('metalsmith-sitemap');
var pageTitles = require('metalsmith-page-titles');
var htmlMinifier = require("metalsmith-html-minifier");
var drafts = require('metalsmith-drafts');
var handlebars = require('handlebars');
var moment = require('moment');
var config = require('./config.json');

handlebars.registerHelper('timestamp', function () {
    return moment().format("X");
});
handlebars.registerHelper('dateFormat', function (context) {
    return moment(context).format("LL");
});
handlebars.registerHelper('dateYear', function () {
    return moment().format("YYYY");
});
handlebars.registerHelper('dateGMT', function (context) {
    context = context === 'new' ? new Date() : context;
    return context.toGMTString();
});

module.exports = Metalsmith(__dirname)
    .source(config.build.source)
    .destination(config.build.destination)
    .clean(true)
    // https://github.com/segmentio/metalsmith-metadata
    .metadata(config.metadata)
    // https://github.com/kalamuna/metalsmith-env
    .use(env())
    // https://github.com/hellatan/metalsmith-page-titles
    .use(pageTitles())
    // https://github.com/radiovisual/metalsmith-rootpath
    .use(rootPath())
    // https://github.com/segmentio/metalsmith-permalinks
    .use(permalinks({
        relative: false,
        pattern: ':slug'
    }))
    // https://github.com/superwolff/metalsmith-layouts
    .use(layouts({
        engine: 'handlebars',
        directory: 'layouts',
        partials: 'partials'
    }))
    // https://github.com/segmentio/metalsmith-drafts
    .use(drafts())
    // https://github.com/whymarrh/metalsmith-html-minifier
    .use(htmlMinifier())
    // https://github.com/ExtraHop/metalsmith-sitemap
    .use(sitemap({
        hostname: config.metadata.site.url
    }));

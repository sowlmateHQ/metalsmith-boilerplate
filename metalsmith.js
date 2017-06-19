'use strict';

var Metalsmith = require('metalsmith');
var rootPath = require('metalsmith-rootpath');
var permalinks = require('metalsmith-permalinks');
var layouts = require('metalsmith-layouts');
var sitemap = require('metalsmith-sitemap');
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
    .source(config.source)
    .destination(config.destination)
    .clean(true)
    .metadata(config.metadata)
    .use(rootPath())
    .use(permalinks({
        relative: false,
        pattern: ':slug'
    }))
    .use(layouts({
        engine: 'handlebars',
        directory: 'layouts',
        partials: 'partials'
    }))
    .use(sitemap(config.metadata.site.url));

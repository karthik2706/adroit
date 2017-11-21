'use strict';
const assemble = require('assemble'),
    extname = require('gulp-extname'),
    browserSync = require('browser-sync');

let config = require('../config');
const filePath = config.filePath;
const configApp = filePath.html;

let distHtml = configApp.compiledSrc;

module.exports = () => {

    // assemble options
    assemble.layouts(configApp.layouts);

    // look for partials from different locations
    if (configApp.partials) {
        for (var i = 0; i < configApp.partials.length; i++) {
            assemble.partials(configApp.partials[i]);
        }
    }

    assemble.data(configApp.data);
    return assemble.src(configApp.pages)
        .pipe(extname())
        .pipe(assemble.dest(distHtml))
        .pipe(browserSync.stream());
};
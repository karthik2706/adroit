'use strict';
const gulp = require('gulp');

let config = require('../config');

const filePath = config.filePath;
const templatesSrc = [filePath.html.templatesSrc];

/**
 * Add the hbs files from the componentsSrc folder to templates folder, that can accessed through ajax
 * Example code: templatesSrc.push(config.base.componentsSrc+'/common/radio-button/*.hbs');
 */

module.exports = () => {
    let destTemplatesFolder = config.base.distTemplates;
    return gulp.src(templatesSrc)
        .pipe(gulp.dest(destTemplatesFolder));
};
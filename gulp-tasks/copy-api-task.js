'use strict';
const gulp = require('gulp'),
    config = require('../config');

const filePath = config.filePath;
const scrAPIs = filePath.copyfiles.api;

module.exports = () => {
    return gulp.src(scrAPIs)
        .pipe(gulp.dest(config.base.distAPIs));
        //.pipe(gulp.dest(config.base.hySrcFonts));
};

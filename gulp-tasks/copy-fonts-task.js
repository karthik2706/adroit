'use strict';
const gulp = require('gulp');
let config = require('../config');

const filePath = config.filePath;
const scrFonts = filePath.copyfiles.fonts;

module.exports = (isAemBuild) => {
    let destFontsPath = config.base.distFonts;
    if (isAemBuild) {
        destFontsPath = aemConfig.base.distFonts;
    }
    return gulp.src(scrFonts)
        .pipe(gulp.dest(destFontsPath));
};
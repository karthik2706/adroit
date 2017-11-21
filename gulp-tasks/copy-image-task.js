'use strict';
const gulp = require('gulp');
let config = require('../config');

const filePath = config.filePath;
const scrImgs = filePath.copyfiles.img;

module.exports = (isAemBuild) => {
    let destImgPath = config.base.distImg;
    return gulp.src(scrImgs)
        .pipe(gulp.dest(destImgPath));
};
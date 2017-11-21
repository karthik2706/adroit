'use strict';
const gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    browserSync = require('browser-sync'),
    config = require('../config');

module.exports = (isAemBuild) => {
    const filePath = config.filePath;
    const srcCss = filePath.styles.scssConcat,
        fontsCss = filePath.styles.fontsScss,
        printCss = filePath.styles.printScss,
        sassOptions = filePath.styles.sassOptions,
        autoprefixerOptions = filePath.styles.autoprefixerOptions;

    let distCss = filePath.styles.distCss;

    gulp.src([fontsCss, printCss])
        .pipe(plugins.sass(sassOptions).on('error', plugins.sass.logError))
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(distCss))
        .pipe(browserSync.stream());

    return gulp.src(srcCss)
        .pipe(plugins.sass(sassOptions).on('error', plugins.sass.logError))
        .pipe(plugins.sourcemaps.write('./maps'))
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(distCss))
        .pipe(browserSync.stream());
};
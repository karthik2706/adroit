'use strict';
const gulp = require('gulp');
const gulpTask = require('./gulp-tasks');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const config = require('./config');
const base = config.base;

// Handlebar compilation using assemble
gulp.task('markupCompile', () => {
    return gulpTask.assembleTask();
});

// SCSS file compile and minification task
gulp.task('sass', () => {
    gulpTask.sassTask();
});

// JS task
gulp.task('js', () => {
    gulpTask.jsTask();
});

// Copy image to the dist folder
gulp.task('copy-img', () => {
    gulpTask.copyImgTask();
});

// Copy fonts to the dist folder
gulp.task('copy-fonts', () => {
    gulpTask.copyFontTask();
});

// Copy templates to the dist folder
gulp.task('copy-templates', () => {
    gulpTask.copyTemplatesTask();
});

// Copy api to the dist folder
gulp.task('copy-api', () => {
    gulpTask.copyApiTask();
});

gulp.task('sass-watch', ['sass'], () => {
    return reload('*.css');
});

gulp.task('js-watch', ['js'], () => {
    return reload('*.js');
});

gulp.task('template-watch', ['markupCompile', 'copy-templates'], () => {
    return reload();
});

// Watch function
const watch = () => {
    gulp.watch(base.src + '/**/**/*.scss', ['sass-watch']);
    gulp.watch(base.src + '/**/**/*.js', ['js-watch']);
    gulp.watch(base.src + '/**/*.hbs', ['template-watch']);
};

gulp.task('watch', watch());

function browserSyncInit() {
    browserSync.init({
        port: 9000,
        server: {
            baseDir: base.root,
            https: false,
            middleware: [{
                route: '/',
                handle: (req, res, next) => {
                    res.writeHead(302, { 'Location': '/dist' });
                    res.end();
                    next();
                }
            }]
        }
    }, () => {
        console.log('APPLICATION IS WATCHING FOR CHANGES');
    });
}

gulp.task('default', ['watch', 'markupCompile', 'sass', 'js', 'copy-img', 'copy-fonts', 'copy-templates', 'copy-api'], () => {
    browserSyncInit();
});
'use strict';
const gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    fs = require('fs'),
    webpackConfig = require('../webpack.config.js'),
    webpackComponentList = require('../webpack-components');
    
let config = require('../config'),
    aemConfig = require('../aem-config');

module.exports = (isAemBuild) => {
    if(isAemBuild){
        config = aemConfig;
    }
    const base           = config.base;
    const filePath       = config.filePath;
    const vendorLibs     = filePath.scripts.vendorLibs;
    const distJs         = base.distJs;

    // webpack configurations
    const entryFile  = filePath.scripts.componentsEntry;
    const content    = webpackComponentList
        .map(function (path) {
            return "require('./" + path + "');";
        })
        .join('\n');
    
    if(!isAemBuild){
        generateWebpackEntryFile(entryFile, content);
    }

    // vendor libs compilation
    gulp.src(vendorLibs)
        .pipe(plugins.concat('vendor-libs.js'))
        .pipe(gulp.dest(distJs));

    // webpack scripts compilation
    return plugins.webpack(webpackConfig)
        .pipe(gulp.dest(distJs));
};

function generateWebpackEntryFile(entryFile, content) {
    fs.writeFile(
        entryFile,
        '"use strict";\n\n' + content,
        function (err) {
            if (err) {
                return console.log(err);
            }
        });
}

/**
 * This file is used to create multiple nested files in one go with all of them linked with
 * their component-entry.js and component-entry.scss so that evevry directory is tracked properly
 */
"use strict";

const ASYNC = require('async'),
PATH = require('path'),
FS = require('fs'),
directoryPresent = require('./is-directory-present.js'),
appendToWebpackComponentsFile = require('./append-to-web-components-file.js'),
getDirPath = require('./directory-path');

function noop() {}

module.exports = (dirPath, componentsPath, callBack) => {

    const DIR_PATH = dirPath.split('/');
    let adjustedPaths = [];
    
    DIR_PATH.forEach((dir, dirIndex) => {
        let seperatePath = '';
        if (dir !== '') {
            for(let innerIndex = 0; innerIndex <= dirIndex; innerIndex++ ) {
                seperatePath += DIR_PATH[innerIndex] + '/';
            }
            adjustedPaths.push(seperatePath);
        }
    });

    if (DIR_PATH.length > 1) {
        let newRootPath = getDirPath(componentsPath + adjustedPaths[0]);

        // Iterate over each path mentioned
        ASYNC.eachSeries(adjustedPaths, (individualPath, asyncBack) => {

            let solvedDirPath = getDirPath(componentsPath + individualPath);

            directoryPresent(solvedDirPath, (err, directoryPresent) => {
                if (directoryPresent) {
                    asyncBack();
                } else {
                    FS.mkdir(solvedDirPath, (err, resp) => {
                        if (err) {
                            // console.log(err);
                            // console.log('Error creating directory. \n');
                            return noop;
                        }

                        // Once directory is created then create components-entry.js and components-entry.scss files
                        FS.writeFile(solvedDirPath + 'components-entry.js', '\'use strict\';\n');
                        FS.writeFile(solvedDirPath + 'components-entry.scss', '');

                        // As the file is just created, root folder has to be added to webpack-components.js
                        // And corresponding css file has to be added to components.scss of fe-components
                        if (newRootPath === solvedDirPath) {
                            // console.log('IS ROOOOOOT');
                            // After that link the component-entry in webpack-components.js

                            appendToWebpackComponentsFile(true, DIR_PATH[0]);

                            // Adding components-entry.scss of this newly created directory in components.scss of fe-components
                            FS.appendFile(
                                PATH.dirname(solvedDirPath) + '/components.scss',
                                '\n@import \'' + DIR_PATH[0] + '/components-entry\';'
                            );
                        } else {
                            FS.appendFile(
                                PATH.dirname(solvedDirPath) + '/components-entry.scss',
                                '\n@import \'' + DIR_PATH[adjustedPaths.indexOf(individualPath)] + '/components-entry\';'
                            );

                            FS.appendFile(
                                PATH.dirname(solvedDirPath) + '/components-entry.js',
                                '\nrequire(\'./' + DIR_PATH[adjustedPaths.indexOf(individualPath)] + '/components-entry.js\');'
                            );
                        }

                        // Once appended to webpack-components.js then add the new component to this directory.
                        asyncBack();
                    });
                }
            });          
        }, (err) => {
            callBack();
        });
    } else {
        // happens when the dir is empty/not mentioned
        callBack();
    }
};
/**
 * Checks if a directry is present or now.
 * Additionally checks if the path provided is a directory or a file
 */
"use strict";

let fs = require('fs');

var isDirectoryPresent = (dirPath, callback) => {
    fs.stat(dirPath, (err, stats) => {
        if (err) {
            // Directory doesn't exist or something.
            if (err.code === 'ENOENT') {
                // console.log('Folder doesn\'t exist \n' + dirPath);
                return callback(null, false);
                
            } else {
                console.log('Something went wrong while checking for directory\n', dirPath);
                return callback(err, null);
            }
            
        }
        if (!stats.isDirectory()) {
            // This isn't a directory!
            // console.log(dirPath +' is not a directory!');
            callback({'Error': 'Provided path is not a directory!'}, null);
        } else {
            // console.log(dirPath + ' directory already exist!');
            callback(null, true);
        }
    });
};

module.exports = isDirectoryPresent;

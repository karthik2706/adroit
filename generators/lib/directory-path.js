"use strict";

function createDirectoryPath(path) {
    // Check if the path passed has / at the end of the path passed
    // else add it.
    if ('/' === path.substr(path.length - 1)) {
        return process.cwd() + '/' + path;
    } else {
        return process.cwd() + '/' + path + '/';
    }    
}

module.exports = createDirectoryPath;

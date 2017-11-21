'use strict';

var mkdirp = require('mkdirp');

function makeDirs(fullPath, testFilePath) {
    mkdirp(fullPath, function (err) {
        if (err) console.error(err);
    });
    mkdirp(fullPath+'/clientlibs', function (err) {
        if (err) console.error(err);
    });
    mkdirp(testFilePath, function (err) {
        if (err) console.error(err);
    });
}

module.exports = makeDirs;

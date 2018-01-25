"use strict";

var fs = require('fs');

function generateFile(template, path) {
    fs.writeFile(path, template, function(err) {
        if (err) return console.log(err);
    });
}

module.exports = generateFile;

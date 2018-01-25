"use strict";

var capitalizeFirstLetter = require('./capitalize-first-letter');

function dashToCamelCase(str) {
    return str
        .split('-')
        .map(function(part, i) {
            if (i < 1) {
                return part;
            }
            return capitalizeFirstLetter(part);
        })
        .join()
        .replace(/,/g, '');
}

module.exports = dashToCamelCase;

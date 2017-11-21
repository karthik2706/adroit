"use strict";

var capitalizeFirstLetter = require('./capitalize-first-letter');

function uppercaseEachWord(componentName) {
    return componentName
        .split('-')
        .map(function(part) {
            return capitalizeFirstLetter(part);
        })
        .join()
        .replace(/,/g, ' ');
}

module.exports = uppercaseEachWord;

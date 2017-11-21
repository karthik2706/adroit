"use strict";

function stringIsNotEmpty(str) {
    return typeof str === 'string' && str.length > 0;
}

module.exports = stringIsNotEmpty;

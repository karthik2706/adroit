"use strict";

function replaceAll(str, pattern, newSubStr) {
    return str.replace(new RegExp(pattern, 'g'), newSubStr);
}

module.exports = replaceAll;

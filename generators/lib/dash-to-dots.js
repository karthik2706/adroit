"use strict";

var replaceAll = require('../string-replace-all');

function dashToDots(str) {
    return replaceAll(str, '-', '.');
}

module.exports = dashToDots;

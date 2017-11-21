"use strict";

var map = require('lodash.map');
var resolvePath = require('./resolve-path');

function resolvePaths(array) {
    return map(array, resolvePath);
}

module.exports = resolvePaths;

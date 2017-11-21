"use strict";

var isWindows = require('./is-windows');

function resolvePath(value) {
    if (!isWindows()) {
        return value;
    }
    return value.replace(/\\/g, '/').slice(0, -1);
}

module.exports = resolvePath;

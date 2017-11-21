/**
 * Tries to find an element within a parent element.
 *
 * @module dom.is-child-of
 * @version 1.0.0
 * @since Sat Sep 19 2015
 */
'use strict';

const isObject = require('lodash.isobject');

/**
 * Check if `childNode` is found in `parentNode`.
 *
 * @param  {*}  parentNode The node to look in.
 * @param  {*}  childNode The node to look for.
 * @returns {boolean} Returns `true` if `parentNode` contains `childNode`, else `false`.
 */
function isChildOf(parentNode, childNode) {
    if (!isObject(parentNode) || !isObject(childNode)) {
        return false;
    }
    if (!isObject(parentNode.contains)) {
        return false;
    }
    if (childNode === document.body) {
        return false;
    }
    return parentNode.contains(childNode);
}

module.exports = isChildOf;

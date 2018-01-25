/**
 * DOM utilities to use native browser capabilities and avoid dependencies.
 *
 * @module dom.dom-util
 * @version 1.0.0
 * @since Fri Nov 20 2015
 */

"use strict";

/**
 * Native DOM ready function.
 *
 * @param  {Function} callback
 */
exports.ready = function(callback) {
    document.addEventListener("DOMContentLoaded", callback, false);
};

/**
 * Native querySelectorAll to find all the dom element with given selector.
 *
 * @param  {String | Object} selector Target selector element.
 * @param  {String | Object} context  Context/parent element, if it not provided
 * fallback to document.
 * @return {nodeList | Array} Returns the target as a DOM node.
 */
exports.findAll = function(selector, context) {
    return (context || document).querySelectorAll(selector);
};

/**
 * Find closest element based of element, selector
 *
 * @param {Object} el This is HTML element.
 * @param {String} selector This will be used as selector for closest element
 * element.
 * @param {string} stopSelector optional; if we want to search till which element
 * @return {Boolean} Returns true/false
 */

exports.closest = function(el, selector, stopSelector) {
    var retval = null;
    while (el) {
        if (this.hasClass(el, selector)) {
            retval = el;
            break;
        } else if (stopSelector && this.hasClass(el, stopSelector)) {
            break;
        }
        el = el.parentElement;
    }
    return retval;
};

/**
 * Checks if the queried id existance on the parent nodes.
 *
 * @param {Object} el This is HTML element.
 * @param {String} id This will be used as id selector for parent
 * element.
 * @return {Boolean} Returns true/false
 */
exports.hasParent = function(ele, id) {
    if (!ele) return false;
    var el = ele.target || ele.srcElement || ele || false;
    while (el && el.id != id) {
        el = el.parentNode || false;
    }
    return (el !== false);
};

/**
 * Native querySelector to find first element in the dom with given selector
 *
 * @param  {String | Object} selector Target selector element.
 * @param  {String | Object} context  Context/parent element, if it not provided
 * fallback to document.
 * @return {Object} returns the target as a DOM node
 */
exports.findFirst = function(selector, context) {
    return (context || document).querySelector(selector);
};

/**
 * Checks for classList native support.
 *
 * @return {Boolean} Returns true/false.
 */
function checkClassListSupport() {
    return ('classList' in document.documentElement) ? true : false;
}

/**
 * Find closest element based of element, selector
 *
 * @param {Object} el This is HTML element.
 * @param {String} selector This will be used as selector for closest element
 * element.
 * @param {string} stopSelector optional; if we want to search till which element
 * @return {Boolean} Returns true/false
 */

exports.closest = function(el, selector, stopSelector) {
    var retval = null;
    while (el) {
        if (this.hasClass(el, selector)) {
            retval = el;
            break;
        } else if (stopSelector && this.hasClass(el, stopSelector)) {
            break;
        }
        el = el.parentElement;
    }
    return retval;
};

/**
 * Checks if the queried id existance on the parent nodes.
 *
 * @param {Object} el This is HTML element.
 * @param {String} id This will be used as id selector for parent
 * element.
 * @return {Boolean} Returns true/false
 */
exports.hasParent = function(ele, id) {
    if (!ele) return false;
    var el = ele.target || ele.srcElement || ele || false;
    while (el && el.id != id) {
        el = el.parentNode || false;
    }
    return (el !== false);
};

/**
 * Checks if the queried classname existance on the element.
 *
 * @param {Object} el This is HTML element.
 * @param {String} className This will be used a new style class added to the
 * element.
 * @return {Boolean} Returns true/false
 */
exports.hasClass = function(el, className) {
    var classListSupport = checkClassListSupport();

    // check if the element is not null and classList is supported
    if (el && classListSupport) {
        return el.classList.contains(className);
    }

    // fallback for non-classlist supported browsers
    if (el && !classListSupport) {
        return new RegExp('\\b' + className + '\\b').test(el.className);
    }
};

/**
 * Adds style class to the supplied element.
 *
 * @param {Object} el This is HTML element.
 * @param {String} className This will be used as a style class to be added to
 * the element.
 */
exports.addClass = function(el, className) {
    var classListSupport = checkClassListSupport();

    // check if the element is not null and classList is supported
    if (el && classListSupport) {
        el.classList.add(className);
    }

    // fallback for non-classlist supported browsers
    if (el && !classListSupport && !exports.hasClass(el, className)) {
        el.className += ' ' + className;
    }
};

/**
 * Removes style class from the supplied element.
 *
 * @param {Object} el This is HTML element.
 * @param {String} className This will be used as a style class to be removed
 * from the element.
 */
exports.removeClass = function(el, className) {
    var classListSupport = checkClassListSupport();

    // check if the element is not null and classList is supported
    if (el && classListSupport) {
        el.classList.remove(className);
    }

    // fallback for non-classlist supported browsers
    if (el && !classListSupport) {
        el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
    }
};

/**
 * Based on the browser test stats form below URL, for loop is much faster than
 * any other implementation, if we catch the variables, so this below utility
 * method will help avoiding lodash dependency
 * https://jsperf.com/angular-foreach-vs-native-for-loop/29
 *
 * @param  {Array}   array
 * @param  {Function} callback
 */
exports.forEach = function(array, callback) {
    var i;
    var length = array.length;

    for (i = 0; i < length; i++) {
        var ele = array[i];

        // callback with element as a parameter
        callback(ele);
    }
};

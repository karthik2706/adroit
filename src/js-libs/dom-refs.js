/**
 * Finds all elements using the selectors passed in and adds the element
 * to the passed in key for the selector.
 *
 * @module component-register
 * @version 1.0.0
 * @since Sat May 28 2016
 */
'use strict';

const forEach = require('lodash.foreach');
const domUtil = require('./dom/dom-util');

/**
 * Updates `instance.domRefs`, adds a reference for each selector.
 *
 * @param  {object} instance
 */
function domRefs(instance) {
    instance.domRefs = instance.domRefs || {};
    forEach(instance.domRefs.first, appendFirstReference.bind(instance));
    forEach(instance.domRefs.all, appendAllReference.bind(instance));
}

/**
 * Binds an element to the `reference`.
 *
 * @param  {string} suffixSelector
 * @param  {string} reference
 */
function appendFirstReference(suffixSelector, reference) {
    // when sufficSelector is an object, that means the component's domRefs have already been parsed earlier
    if(typeof suffixSelector === "object"){
        return;
    }
    /*jshint validthis: true */
    const instance = this;
    const selector = makeSelector(instance.domRefs, suffixSelector);
    const childEl  = find('findFirst', selector, instance.element);
    instance.domRefs.first[reference] = childEl;
}

/**
 * Binds an element to the `reference`.
 *
 * @param  {string} suffixSelector
 * @param  {string} reference
 */
function appendAllReference(suffixSelector, reference) {
    if(typeof suffixSelector === "object"){
        return;
    }
    /*jshint validthis: true */
    const instance = this;
    const selector = makeSelector(instance.domRefs, suffixSelector);
    const childEls = find('findAll', selector, instance.element);
    instance.domRefs.all[reference] = toArray(childEls);
}

/**
 * Creates the full selector.
 *
 * @param  {object} domRefs
 * @param  {string} suffixSelector
 * @return {string}
 */
function makeSelector(domRefs, suffixSelector) {
    return '.' + domRefs.definition + suffixSelector;
}

/**
 * Returns a list of elements or a single element from `element`.
 *
 * @param  {string} method
 * @param  {string} selector
 * @param  {HTMLElement} element
 * @return {NodeList | HTMLElement}
 */
function find(method, selector, element) {
    return domUtil[method](selector, element);
}

/**
 * Converts `value` to an `Array`.
 *
 * @param  {*} value
 * @return {Array}
 */
function toArray(value) {
    return Array.prototype.slice.call(value);
}

module.exports = domRefs;

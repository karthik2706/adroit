/**
 * Manages the storing and retrieving of the component lists.
 *
 * @module component-register
 * @version 1.0.0
 * @since Tue Jul 21 2015
 */
'use strict';

/**
 * Stores the components.
 * @type {Object}
 */
const list = {};

/**
 * Creates a list for specific component instances.
 *
 * @param  {string} key Reference to the list.
 * @param  {object | function} definition The instance that will be created
 * and linked to the DOM element.
 */
exports.createList = function(key, definition) {
    list[key] = {
        components: [],
        definition: definition
    };
};

/**
 * Destroy a list.
 *
 * @param  {string} key Reference to the list.
 */
exports.destroyList = function(key) {
    delete list[key];
};

/**
 * Return a list based on reference.
 *
 * @param  {string} key Reference to the list.
 * @return {Array | undefined}
 */
exports.getList = function(key) {
    return list[key];
};

/**
 * Returns every list available.
 *
 * @return {object}
 */
exports.all = function() {
    return list;
};

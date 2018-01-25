/**
 * @module component-register
 * @version 1.0.0
 * @since Tue Jul 28 2015
 */
'use strict';

const defaults = require('lodash.defaults');
const isFunction = require('lodash.isfunction');
const createBaseComponent = require('./base-component');

/**
 * Generates the instance using `definition`.
 *
 * @param  {object | function} definition Instance definition.
 * @return {object} The newly created instance.
 */
function createInstance(definition) {
    if (isFunction(definition)) {
        return definition();
    }
    return Object.create(definition);
}

/**
 * If `definition` is a function, the factory method is called and return
 * the component instance from the method.
 * Else it creates a new object, using the definitions prototype.
 *
 * Creates the instance and extend a base component instance to it.
 *
 * @param  {object | function} definition Instance definition.
 * @return {object} The newly created instance.
 */
function createComponent(definition) {
    const instance = createBaseComponent();
    return defaults(createInstance(definition), instance);
}

module.exports = createComponent;

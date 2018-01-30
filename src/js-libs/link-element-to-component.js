/**
 * @module component-register
 * @version 1.0.0
 * @since Tue Jul 28 2015
 */
'use strict';

const createComponent = require('./create-component');
const getDataAttributes = require('./dom/get-data-attributes');

/**
 * Creates a component instance and links the element to the instance.
 *
 * @param {HTMLElement} el Element to be linked to a component instance.
 * @param {function} definition Factory method or object to create a new
 * component instance.
 */
function linkElementToComponent(el, definition) {
    const component = createComponent(definition);
    component.element = el;
    component.attributes = getDataAttributes(el);
    return component;
}

module.exports = linkElementToComponent;

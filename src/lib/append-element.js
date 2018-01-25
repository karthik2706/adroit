/**
 * @module component-register
 * @version 1.0.0
 * @since Tue Jul 28 2015
 */
'use strict';

const componentList = require('./component-list');
const linkElementToComponent = require('./link-element-to-component');

/**
 * Attaches a node and iterates each child within the node to
 * link them to a component instance.
 *
 * @param  {HTMLElement} node
 */
function iterateChildren(node) {
    let index = -1;
    const length = node.children.length;
    while (++index < length) {
        iterateChildren(node.children[index]);
    }
    initializeElement(node);
}

/**
 * Iterates each class name and tries to bind the element to a
 * component instance.
 *
 * @param  {HTMLElement} node
 */
function initializeElement(node) {
    const classNames = node.className.split(' ');
    let index = -1;
    const length = classNames.length;
    while (++index < length) {
        initializeElementByClassName(node, classNames[index]);
    }
}

/**
 * Tries to bind the element to a component instance.
 *
 * @param  {HTMLElement} node
 * @param  {string} className
 */
function initializeElementByClassName(node, className) {
    const list = componentList.getList(className);
    if (typeof list === 'undefined') {
        return;
    }
    const component = linkElementToComponent(node, list.definition);
    component.attachedCallback();
    list.components.push(component);
}

/**
 * Appends an element from the DOM. Also links it to a component instance.
 *
 * @param  {HTMLElement} el Element linked to a component instance.
 * @param  {String} className Class name for the element, as well as
 * reference to the component list.
 * @param  {HTMLElement} parentEl Element to append to.
 * @return {object} The new instance.
 */
function appendElement(el, className, parentEl) {
    parentEl.appendChild(el);
    iterateChildren(el);

    const list = componentList.getList(className);
    if (typeof list === 'undefined' || list.components.length < 1) {
        return;
    }
    return list.components[list.components.length - 1];
}

module.exports = appendElement;

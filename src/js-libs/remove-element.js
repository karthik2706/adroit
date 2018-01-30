/**
 * ...
 *
 * @module component-register
 * @version 1.0.0
 * @since Tue Jul 21 2015
 */
'use strict';

const filter = require('lodash.filter');
const componentList = require('./component-list');

/**
 * Matches an element to the component instance element.
 *
 * @param  {HTMLElement} el
 * @return {function}
 */
function elementMatch(el) {
    return function(component) {
        return typeof component.element === 'undefined' ||
            component.element === el;
    };
}

/**
 * Detaches a node and iterates each child within the node to
 * unlink them from the component instance.
 *
 * @param  {HTMLElement} node
 */
function iterateChildren(children) {
    let index = -1;
    const length = children.length;
    while (++index < length) {
        disposeElement(children[index]);
    }
}

/**
 * Iterates each class name and tries to unbind the element from a
 * component instance.
 *
 * @param  {HTMLElement} node
 */
function disposeElement(node) {
    let classNames = [];
    // while removing nodes, there are elements which doesnt have class attribute.
    if(node.className && node.className.length > 0){
        classNames = node.className.split(' ');
    }
    
    let index = -1;
    const length = classNames.length;
    while (++index < length) {
        disposeElementByClassName(node, classNames[index]);
    }
    if (node.children) {
        iterateChildren(node.children);
    }
}

/**
 * Tries to unbind the element from a component instance.
 *
 * @param  {HTMLElement} node
 * @param  {string} className
 */
function disposeElementByClassName(node, className) {
    const list = componentList.getList(className);
    if (typeof list === 'undefined') {
        return;
    }
    removeElement(node, className, false);
}

/**
 * Removes the DOM element from the parent element.
 *
 * @param  {HTMLElement} el The current element to be removed.
 */
function removeFromParent(el) {
    const parent = el.parentNode;
    parent.removeChild(el);
}

/**
 * Removes a component from the list of components if the elements are matching.
 *
 * @param  {Array} components       List of components.
 * @param  {function} matchFoundFn  Callback to compare elements.
 */
function removeComponentFromList(components, matchFoundFn) {
    let index = components.length;
    while (index--) {
        if (matchFoundFn(components[index])) {
            delete components[index].element;
            components.splice(index, 1);
        }
    }
}

/**
 * Removes an element from the DOM. Also unlinks it from its component
 * instance.
 *
 * @param  {HTMLElement} el Element linked to a component instance.
 * @param  {String} className Class name for the element, as well as
 * reference to the component list.
 */
function removeElement(el, className, opt_isMainElement) {
    iterateChildren(el.children);
    const matchFoundFn = elementMatch(el);
    const components = componentList.getList(className).components || {};
    const component = filter(components, matchFoundFn)[0];
    if (typeof component === 'undefined') {
        return;
    }
    if (opt_isMainElement !== false) {
        removeFromParent(component.element);
    }
    component.detachedCallback();
    removeComponentFromList(components, matchFoundFn);
}

module.exports = removeElement;

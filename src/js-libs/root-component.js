/**
 * The root component. Linked to the body element.
 *
 * @module component-register
 * @version 1.0.0
 * @since Thu Dec 10 2015
 */
'use strict';

//dependencies
const isArray = require('lodash.isarray');
const isChildOf = require('./dom/is-child-of');

/**
 * Element linked to the instance.
 * @type {HTMLElement}
 */
exports.element = document.body;

/**
 * Calls each instance `attached` function. Iterates down to child level and
 * move up.
 */
exports.attachInstances = function() {
    attachChildren(exports.children);
};

/**
 * Iterates the list of components and link parents with children.
 * Once the link is created, `instance.created` will be called.
 */
exports.createHierarchy = function(orderedList, clearChildren) {
    if (!orderedList || orderedList.length < 1) {
        return;
    }
    let index = 0;
    const length = orderedList.length;
    const firstChild = orderedList[0];
    if( clearChildren ){
        delete exports.children;
    }
    setParent(exports, firstChild);
    while (++index < length) {
        const prev = orderedList[index - 1];
        const curr = orderedList[index];
        if (isChildOf(prev.element, curr.element)) {
            setParent(prev, curr);
        }
        else {
            findParent(prev.parent, curr);
        }
    }
    callCreated(exports.children);
};

/**
 * Calls `attached` for each child.
 *
 * @param  {Array} children List of instances.
 */
function attachChildren(children) {
    if (!children) {
        return;
    }
    let index = -1;
    const length = children.length;
    while (++index < length) {
        const child = children[index];
        if (child.children) {
            attachChildren(child.children);
        }
        child.attachedCallback();
    }
}

/**
 * Calls `created` for each child.
 *
 * @param  {Array} children List of instances.
 */
function callCreated(children) {
    /* istanbul ignore if */
    if (!children) {
        return;
    }
    let index = -1;
    const length = children.length;
    while (++index < length) {
        const child = children[index];
        if (child.children) {
            callCreated(child.children);
        }
        child.createdCallback();
    }
}

/**
 * Sets the child instance parent property to the parent instance. Also
 * appends the child to the list of children in for the parent.
 *
 * @param {object} parent Parent instance.
 * @param {object} child  Child instance.
 */
function setParent(parent, child) {
    if (!isArray(parent.children)) {
        parent.children = [];
    }
    child.parent = parent;
    parent.children.push(child);
}

/**
 * Keeps iterating up one hierachy until the childs parent is found.
 *
 * @param  {object} parent Parent instance.
 * @param  {object} child  Child instance.
 */
function findParent(parent, child) {
    /* istanbul ignore if */
    if (!parent) {
        return;
    }
    if (isChildOf(parent.element, child.element)) {
        setParent(parent, child);
        return;
    }
    findParent(parent.parent, child);
}

/**
 * Uses a `component` and finds instances matching `childReference`. Looks though
 * the DOM based on the `component`.
 *
 * @module component-register
 * @version 1.0.0
 * @since Sat Sep 19 2015
 */
'use strict';

const isArray = require('lodash.isarray');
const isPlainObject = require('lodash.isplainobject');
const componentList = require('./component-list');
const isChildOf = require('./dom/is-child-of');

/**
 * Returns all instances that has an element placed in the same
 * hiarachy as the `component` element.
 *
 * @param  {object} component      The parent component.
 * @param  {string} childReference Reference to the component.
 * @return {Array}                A list of all found instances.
 */
function getChildInstances(component, childReference) {
    const list = componentList.getList(childReference);
    const result = [];
    if (!isPlainObject(component) || !isPlainObject(list) || !isArray(list.components)) {
        return result;
    }
    const componentEl = component.element;
    let index = -1;
    const length = list.components.length;
    while (++index < length) {
        if (isChildOf(componentEl, list.components[index].element)) {
            result.push(list.components[index]);
        }
    }
    return result;
}

module.exports = getChildInstances;

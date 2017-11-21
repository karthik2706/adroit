/**
 * Returns all `data-` attributes from an element.
 *
 * @module dom
 * @version 1.0.0
 * @since Say Nov 7 2015
 */
'use strict';

const camelCase = require('lodash.camelcase');
const forEach = require('lodash.foreach');

/**
 * Iterates the list of attributes from `el` and returns a dictionary of found
 * data- attributes. Each attribute name will be converted to camelCase.
 *
 * @param  {HTMLElement} el The element to work with.
 * @return {object} A dictionary with the attributes name and value.
 */
function getDataAttributes(el) {
    if(!el) {
        return '';
    }
    const data = {};
    forEach(el.attributes, function(attr) {
        if (/^data-/.test(attr.name)) {
            const camelCaseName = camelCase(attr.name.substr(5));
            data[camelCaseName] = attr.value;
        }
    });
    return data;
}

module.exports = getDataAttributes;

'use strict'

/**
 * Finds all element starting with `string`. Queries the DOM for '[class*="string"]'.
 *
 * @param  {string}                  string        The query string.
 * @param  {undefined | HTMLElement} [rootElement] Optional element to search through.
 * @return {Array}                                 List of found elements.
 */
function classNameStartingWith(string, rootElement) {
    rootElement = rootElement || document.body;
    return Array.prototype.slice.call(rootElement.querySelectorAll('[class*="' + string + '"]'), 0);
}

module.exports = classNameStartingWith;

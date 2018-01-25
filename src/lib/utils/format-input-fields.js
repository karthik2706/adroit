/**
 * This will find phone number input and format
 *
 * @module dom
 * @version 1.0.0
 * @since Mon Oct 19 2015
 */
'use strict';

const isUndefined = require('lodash.isundefined');

/**
 * Add Masking to the Phone Number
 *
 * @param {HTMLElement} el
 */
exports.phoneMask = function (el) {
    if (isUndefined(jQuery.fn.mask)) {
        return;
    }
    jQuery(el).mask('(999) 999-9999', {
        placeholder: ' '
    });
};

/**
 * Add Masking to the Credit Card
 *
 * @param {HTMLElement} el
 */
exports.inputMask = function (el, format, placeholder) {
    if (isUndefined(jQuery.fn.mask)) {
        return;
    }
    jQuery(el).mask(format, {
        placeholder: placeholder || ''
    });
};

/**
 * Un Masking to the Credit Card
 *
 * @param {HTMLElement} el
 */
exports.inputUnMask = function (el) {
    if (isUndefined(jQuery.fn.mask)) {
        return;
    }
    jQuery(el).unmask();
    removeNonNumbers(el);
};

/**
 * Remove Masking to the Phone Number
 *
 * @type {HTMLElement} el
 */
exports.phoneUnMask = function (el) {
    if (isUndefined(jQuery.fn.unmask)) {
        return;
    }
    jQuery(el).unmask();
    jQuery(el).attr('maxlength', '50');
    removeNonNumbers(el);
};

/**
 * Get actual Value
 *
 * @type {HTMLElement} el
 */
exports.getValue = function (el) {
    if (isUndefined(jQuery.fn.unmask)) {
        return;
    }
    jQuery(el).unmask();
    removeNonNumbers(el);
    return el.value;
};

/**
 * Removes all characters but numbers from the input value.
 *
 * @param {HTMLElement} el
 */
function removeNonNumbers(el) {
    el.value = el.value.replace(/\D/g, '');
}

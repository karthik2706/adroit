/**
 * An object dealing with elements, callbacks and event listeners.
 *
 * @module component-register
 * @version 1.0.0
 * @since Sun Jan 5 2016
 */
'use strict';

const forEach = require('lodash.foreach');
const filter = require('lodash.filter');
const isFunction = require('lodash.isfunction');
const uniqueId = require('lodash.uniqueid');

/**
 * Triggers the passed `callback`.
 *
 * @param  {Function} callback
 */
function triggerCallback(callback) {
    /*jshint validthis: true */
    callback(this);
}

/**
 * Creates a id object.
 *
 * @param  {HTMLElement} element
 * @return {object}
 */
function createListenerObject(element) {
    /**
     * Component instance.
     * @type {Object}
     */
    const instance = {};

    /**
     * A list of callbacks to be iterated and triggered once event is triggered.
     * @type {Array}
     */
    let callbacks = [];

    /**
     * A unique id for the instance.
     * @type {string}
     */
    instance.id = uniqueId();

    /**
     * The element which to add an event listener to.
     * @type {HTMLElement}
     */
    instance.element = element;

    /**
     * Adds the function to the list of callbacks.
     *
     * @param  {Function} callback
     */
    instance.addCallback = function(callback) {
        if (!isFunction(callback)) {
            return;
        }
        callbacks.push(callback);
    };

    /**
     * Returns the size of the `callbacks` array.
     *
     * @return  {number}
     */
    instance.numberOfCallbacks = function() {
        return callbacks.length;
    };

    /**
     * Iterates the list of added callbacks and triggeres each one in order.
     *
     * @param {*} args
     */
    instance.triggerCallbacks = function(args) {
        forEach(callbacks, triggerCallback.bind(args));
    };

    /**
     * Removes any match of `aFunc` from the list of `callbacks`.
     *
     * @param  {Function} aFunc
     * @return {number} The number of callbacks.
     */
    instance.removeCallback = function(aFunc) {
        callbacks = filter(callbacks, function(callback) {
            return callback !== aFunc;
        });
        return instance.numberOfCallbacks();
    };

    /**
     * Removes everything from the `callbacks` list.
     */
    instance.clearCallbacks = function() {
        callbacks.length = 0;
    };

    return instance;
}

module.exports = createListenerObject;

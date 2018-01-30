/**
 * The base for all components.
 *
 * @module component-register
 * @version 1.0.0
 * @since Sun Sep 20 2015
 */
'use strict';

const forEach = require('lodash.foreach');
const isFunction = require('lodash.isfunction');
const isUndefined = require('lodash.isundefined');
const keys = require('lodash.keys');
const domRefs = require('./dom-refs');
const getChildInstances = require('./get-child-instances');
const createListenerObject = require('./listener-object');
const isChildOf = require('./dom/is-child-of');

/**
 * Creates a base structure for components.
 *
 * @return {object} The component instance.
 */
function createBaseComponent() {
    /**
     * Component instance.
     * @type {Object}
     */
    const instance = {};

    /**
     * A list of added DOM listeners.
     * @type {Object}
     */
    let listeners = {};

    /**
     * Since properties are read only, it is not possible to iterate over
     * the keys in `instance.params`. Therefore each key is stored separately.
     * @type {Array}
     */
    const paramsKeys = [];

    /**
     * Parameters from parent component.
     * @type {Object}
     */
    instance.params = {};

    /**
     * The instance was created. Called before `instance.attached`.
     * Can be overriden to for example update a child component params property.
     */
    instance.createdCallback = function () {
        if (isFunction(this.created)) {
            this.created();
        }
    };

    /**
     * The DOM Element was added to the DOM.
     */
    instance.attachedCallback = function () {
        if (this.domRefs) {
            domRefs(this);
        }
        if (isFunction(this.attached)) {
            this.attached();
        }
    };

    /**
     * The DOM Element was removed from the DOM.
     */
    instance.detachedCallback = function () {
        if (isFunction(this.detached)) {
            this.detached();
        }
        dispose.call(this);
    };

    /**
     * Appends a listener to the instance element. An event `type` is only appended
     * once, after that the `listener` will be stacked and called in order.
     *
     * @param  {string} type        Event type, i.e. 'click'.
     * @param  {function} callback  Callback function.
     * @param  {HTMLElement} opt_element Optional DOMElement, must be child of `instance.element`.
     */
    instance.addEventListener = function (type, callback, opt_element) {
        if (opt_element === null) {
            return;
        }
        if (opt_element && !isChildOf(this.element, opt_element)) {
            return;
        }
        opt_element = opt_element || this.element;
        const listenerObj = initializeListenerByType(type, opt_element);
        //appends the callback to an already existing DOM listener.
        if (listenerObj === listeners[type][listenerObj.id]) {
            listenerObj.addCallback(callback);
            return;
        }
        appendListenerToElement(type, listenerObj, callback);
    };

    /**
     * Tries to find an already exsisting listener object. If not found it will
     * create one and push it to the type array.
     *
     * @param  {string} type
     * @param  {HTMLElement} element
     * @return {object}
     */
    function initializeListenerByType(type, element) {
        let obj = getListenerByElement(type, element);
        if (!obj) {
            obj = createListenerObject(element);
            if (listeners[type]) {
                listeners[type].elements.push(obj);
            }
        }
        if (!listeners[type]) {
            listeners[type] = {
                elements: [obj]
            };
        }
        return obj;
    }

    /**
     * Iterates the list of listener objects for a listener object matching `element`.
     *
     * @param  {string} type
     * @param  {HTMLElement} element
     * @return {undefined | object}
     */
    function getListenerByElement(type, element) {
        if (!listeners[type]) {
            return;
        }
        let index = listeners[type].elements.length;
        while (index--) {
            if (listeners[type].elements[index].element === element) {
                return listeners[type].elements[index];
            }
        }
    }

    /**
     * Creates a new listener callback, which will iterate all callbacks
     * added to the same event and element.
     *
     * @param  {string} type
     * @param  {string} id
     * @return {function}
     */
    function createEventListener(type, id) {
        return function onEventTriggered(event) {
            listeners[type][id].triggerCallbacks(event);
        };
    }

    /**
     * Creates an event listener function and appends it to the DOM element.
     * Also creates a list for the actual callbacks, so when the event is
     * triggered, each callback will be called. This to avoid adding multiple
     * listeners to an element.
     *
     * @param  {string}   type
     * @param  {object}   listenerObj
     * @param  {Function} callback
     */
    function appendListenerToElement(type, listenerObj, callback) {
        listenerObj.listener = createEventListener(type, listenerObj.id);
        listenerObj.addCallback(callback);
        listeners[type][listenerObj.id] = listenerObj;
        listenerObj.element.addEventListener(type, listenerObj.listener, false);
    }

    /**
     * Removes a listener from the instance element. Will look for already added
     * event `type`.
     *
     * @param  {string} type        Event type, i.e. 'click'.
     * @param  {function} callback  Callback function.
     * @param  {HTMLElement} opt_element Optional DOMElement, must be child of `instance.element`.
     */
    instance.removeEventListener = function (type, callback, opt_element) {
        if (opt_element === null) {
            return;
        }
        if (opt_element && !isChildOf(instance.element, opt_element)) {
            return;
        }
        if (!listeners[type]) {
            return;
        }
        opt_element = opt_element || this.element;
        const listenerObj = getListenerByElement(type, opt_element);
        if (!listenerObj) {
            return;
        }
        const size = listenerObj.removeCallback(callback);
        if (size > 0) {
            return;
        }
        opt_element.removeEventListener(type, listenerObj.listener, false);
    };

    /**
     * Returns a list of component instances found within the DOM hiarachy of
     * instance.element.
     *
     * @param  {string} childReference Reference to the component.
     * @return {Array} List of component instances.
     */
    instance.getInstancesOf = function (childReference) {
        return getChildInstances(this, childReference);
    };

    /**
     * Returns a representation of the DOM node.
     *
     * @return {string} DOM content as a string.
     */
    instance.htmlToString = function () {
        return this.element.outerHTML;
    };

    /**
     * Updates the instance `params` property.
     * Copy unchanged properties from previous params to new params.
     * Call params-change listener on the receiving instance.
     *
     * @param  {object} params
     */
    instance.receiveNewParams = function (params) {
        function iterateParamKeys(key) {
            /*jshint validthis: true */
            if (this.params.hasOwnProperty(key) && isUndefined(params[key])) {
                setParamsProperty(params, this.params[key], key);
            }
        }

        appendToParamKeys(keys(params));
        forEach(paramsKeys, iterateParamKeys.bind(this));
        forEach(params, function(value, key) {
            const temp = params[key];
            delete params[key];
            setParamsProperty(params, temp, key);
        });

        this.params = params;

        if (isFunction(this.onNewParamsReceived)) {
            this.onNewParamsReceived();
        }
    };

    /**
     * Appends any missing keys in `paramsKeys`.
     *
     * @param  {Array} array
     */
    function appendToParamKeys(array) {
        forEach(array, function (key) {
            if (paramsKeys.indexOf(key) < 0) {
                paramsKeys.push(key);
            }
        });
    }

    /**
     * Updates a key property of `instance.params`.
     *
     * @param {*} value The new value.
     * @param {string} key The key property.
     */
    function setParamsProperty(params, value, key) {
        Object.defineProperty(params, key, {
            value: value,
            writable: false
        });
    }

    /**
     * Adds a new attribute or changes the value of an existing attribute on the
     * specified element.
     *
     * Will call instance.attributeChanged if it has been set.
     *
     * @param  {string} name  Name of the attribute.
     * @param  {*} value The new value of the attribute.
     *
     * @callback {instance.attributeChanged}
     * @param {string} attr Name of the attribute.
     * @param {*} oldVal The old value of the attribute.
     * @param {*} newVal The new value of the attribute.
     */
    instance.setAttribute = function (name, value) {
        const oldVal = this.element.getAttribute(name);
        this.element.setAttribute(name, value);
        if (!isFunction(this.attributeChanged)) {
            return;
        }
        this.attributeChanged(name, oldVal, value);
    };

    /**
     * Dispose event listeners and properties.
     */
    function dispose() {
        /*jshint validthis: true */
        forEach(listeners, disposeAllListeners.bind(this));
        listeners = undefined;
        delete this.element;
    }

    /**
     * Removes all listeners added to the event `type`.
     *
     * @param  {object} listener
     * @param  {string} type
     */
    function disposeAllListeners(listener, type) {
        /*jshint validthis: true */
        function disposeListener(element) {
            element.clearCallbacks();
            this.removeEventListener(type, element.listener, element.element);
        }
        forEach(listener.elements, disposeListener.bind(this));
    }

    return instance;
}

module.exports = createBaseComponent;

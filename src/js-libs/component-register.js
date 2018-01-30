/**
 * @module component-register
 * @version 1.0.0
 * @since Thu Jun 16 2015
 */
'use strict';

const filter = require('lodash.filter');
const forEach = require('lodash.foreach');
const isFunction = require('lodash.isfunction');
const isString = require('lodash.isstring');
const isPlainObject = require('lodash.isplainobject');
const classNameStartingWith = require('lib/utils/class-name-starting-with');
const componentList = require('lib/component-list');
const linkElementToComponent = require('lib/link-element-to-component');
const rootInstance = require('lib/root-component');
const domUtil = require('lib/dom/dom-util');

// exports = module.exports = registerComponent;

function noop() {}

/**
 * A list of instances in the same order as the DOM.
 * @type {Array}
 */
const hierachy = [];

/**
 * Changes once attached has been called.
 * @type {Boolean}
 */
let domReadyCalled = false;

/**
 * when dynamic html is rendered, components need to updated through onDynamicDomReady method.
 * While it is being executed, isOnDynamicDomReadyFnExecuting flag would be true
 */
let isOnDynamicDomReadyFnExecuting = false;

/**
 * used to hold the dynamic html's components
 */
let dynamicComponentsHierarchy = [];

/**
 * The project prefix that all components will be using in their html.
 * The register uses this to find all of them on page load.
 * @type {string}
 */
let baseReference = 'project-prefix__';

/**
 * Registers a new component. `definition` is used to create an instance
 * that will be linked to an element.
 *
 * @param  {string} className
 * @param  {function | object} definition Factory for creating component
 * instances.
 */
export function registerComponent(className, definition, executeDomReady) {
	if (!isString(className)) {
		throw 'Must pass definition of the component';
	}
	if (!isPlainObject(definition) && !isFunction(definition)) {
		throw 'Must pass component object or function';
	}
	componentList.createList(className, definition);
	/* istanbul ignore else */
	if (domReadyCalled) {
		handleComponentDefinition(className);
	}

	if (executeDomReady) {
		onDomReady();
	}
}

/**
 * Iterates all elements and binds them to a component instance.
 */
function onDomReady() {
	/* istanbul ignore if */
	if (!rootInstance.element) {
		rootInstance.element = document.body;
	}
	if (rootInstance.element.getAttribute('data-comp-prefix')) {
		baseReference = rootInstance.element.getAttribute('data-comp-prefix');
	}
	const allComponentElements = classNameStartingWith(baseReference);
	forEach(allComponentElements, handleComponentElement);
	rootInstance.createHierarchy(hierachy);
	rootInstance.attachInstances();
	domReadyCalled = true;
}

/**
 * Iterates all elements in a given context and binds them to a component instance.
 */
export function onDynamicDomReady(context, parentInstance) {
	isOnDynamicDomReadyFnExecuting = true;
	dynamicComponentsHierarchy = [];
	/* istanbul ignore if */
	if (!context) {
		context = document.body;
	}
	const allComponentElements = classNameStartingWith(baseReference, context);
	forEach(allComponentElements, handleComponentElement);

	let parentInstanceIndex;
	forEach(hierachy, function(curComponent, index) {
		if (curComponent.element === parentInstance.element) {
			parentInstanceIndex = index;
			return;
		}
	});

	let index = dynamicComponentsHierarchy.length;
	while (index--) {
		hierachy.splice(parentInstanceIndex + 1, 0, dynamicComponentsHierarchy[index]);
	}

	restructureHierarchy();

	index = dynamicComponentsHierarchy.length;
	while (index--) {
		dynamicComponentsHierarchy[index].attachedCallback();
	}
	isOnDynamicDomReadyFnExecuting = false;
}

/**
 * Find the component reference from the list of class names, then uses
 * that class name to link the element with the component definition.
 *
 * @param  {HTMLElement} el The element to be linked with a component instance.
 */
function handleComponentElement(el) {
	const key = getFullComponentReference(el.className);
	linkEachElementToComponent(componentList.getList(key))(el);
}

/**
 * Looking through the list of class names and returns the one starting with
 * `baseReference`.
 *
 * @param  {string} className The full list of class names.
 * @return {string} Returns one class name.
 */
function getFullComponentReference(className) {
	return filter(className.split(' '), matchesBaseReference)[0];
}

/**
 * Validates if `className` is a component reference.
 *
 * @param  {string} className
 * @return {boolean}
 */
function matchesBaseReference(className) {
	return className.indexOf(baseReference) > -1;
}

/**
 * Iterates all elements and binds them to a component instance.
 *
 * @param {string} key Class name definition.
 */
function handleComponentDefinition(key) {
	const allElements = findElementsWithClassName(key);
	forEach(allElements, linkEachElementToComponent(componentList.getList(key), true));
}

/**
 * Finds all elements matching the class name.
 *
 * @param  {string} className Class name to find.
 * @return {NodeList} List of elements.
 */
function findElementsWithClassName(className) {
	return document.body.querySelectorAll('.' + className);
}

/**
 * Links each element to a component instance.
 *
 * @param  {object} componentsManager Manager for components.
 * @return {function} Link function.
 */
function linkEachElementToComponent(componentsManager, doAttach) {
	if (!componentsManager) {
		return noop;
	}
	const definition = componentsManager.definition;
	return function linkElement(el) {
		const component = linkElementToComponent(el, definition);
		/* istanbul ignore else */
		if (doAttach) {
			component.attachedCallback();
		}
		componentsManager.components.push(component);

		if (isOnDynamicDomReadyFnExecuting) {
			dynamicComponentsHierarchy.push(component);
		} else {
			hierachy.push(component);
		}
	};
}

export function restructureHierarchy() {
	let index = hierachy.length;
	while (index--) {
		hierachy[index].children = [];

		if (!hierachy[index].hasOwnProperty('element')) {
			hierachy.splice(index, 1);
		}
	}

	rootInstance.createHierarchy(hierachy, true);
}

domUtil.ready(onDomReady);

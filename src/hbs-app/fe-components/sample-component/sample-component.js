/**
 * @module sample-component
 * @version 1.0.0
 * @since Thu Jan 25 2018
 */

// dependencies
import './sample-component.hbs';
import './sample-component.scss';

const compRegisterRef = require('lib/component-register');

const { registerComponent } = compRegisterRef;

/**
 * The definition of the component. Each DOM element will
 * define the elements class with this string.
 * @type {string}
 */
export const componentReference = 'app-js__sample-component';

/**
 * The style definition of the component.
 * @type {string}
 */
export const styleDefinition = 'sample-component';

/**
 * Factory method to create an instance. Linked to an html element.
 *
 * @return {object} Component instance.
 */
function createSamplecomponentInstance() {
	/**
	 * Component instance.
	 * @type {Object}
	 */
	const instance = {};

	/**
	 * By setting `instance.domRefs` the baseComponent will replace the value
	 * of each keys in `instance.domRefs.first` with single elements found
	 * in `instance.element`. Same for `instance.domRefs.all`, but each key
	 * will have an array of elements.
	 *
	 * `first` example: The value of `childEl` will be a `HTMLElement`
	 * `all` example: The value of `rows` will be an `Array` of `HTMLElement`
	 * @type {Object}
	 */
	// instance.domRefs = {
	//   definition: styleDefinition,
	//   first: {
	//     childEl: '__child'
	//   },
	//   all: {
	//     rows: '__row'
	//   }
	// };

	/** @type {Object} */
	// const singleRefs = instance.domRefs.first;

	/** @type {Object} */
	// const listRefs = instance.domRefs.all;

	/**
	 * `created` is called before `attached`. Can be used to pass data to
	 * childrens `params` property.
	 */
	// instance.created = () => {
	//   forEach(instance.children, updateChildParams);
	// };

	/**
	 * Update the `instance.params` for `childInstance`.
	 *
	 * @param {object} childInstance
	 */
	// function updateChildParams(childInstance) {
	//   childInstance.receiveNewParams({
	//     id: instance.attribute.id,
	//     updateId: onIdChanged
	//   });
	// }

	/**
	 * The `instance.params` object was changed from parent calling `instance.receiveNewParams`.
	 * Properties and callback functions can be dealt with or passed down to
	 * child components.
	 */
	// instance.onNewParamsReceived = () => {
	//   forEach(instance.children, child => {
	//     child.receiveNewParams({
	//       updateId: instance.params.updateId
	//     });
	//   });
	// };

	/**
	 * Initialize any DOM elements which can be found within the hbs file for
	 * this component.
	 */
	function initDOMReferences() {
		// myEl = domUtil.findFirst('.'
		//  .concat(exports.styleDefinition)
		//  .concat('__my-el'),
		//  instance.element
		//  );
	}

	/**
	 * Logic to run when component is ready
	 */
	function init() {}

	/**
	 * Append listeners to the element.
	 */
	function addListeners() {
		// TODO remove inline comments, just example code.
		// To attach an event, use one of the following methods.
		// No need remove the listener in `instance.detached`
		// instance.addEventListener('click', onClick); //attached to `instance.element`
		// instance.addEventListener('click', onClick, myEl); //attached to `myEl`
	}

	/**
	 * Dealloc variables and removes any added listeners.
	 */
	function dispose() {}

	/**
	 * The DOM Element was added to the DOM.
	 */
	instance.attached = () => {
		initDOMReferences();
		init();
		addListeners();
	};

	/**
	 * The DOM Element was removed from the DOM.
	 * Dealloc variables and removes any added listeners that was NOT added
	 * through `instance.addEventListener`.
	 */
	instance.detached = () => {
		// console.log('detached!', instance.element);
		dispose();
	};

	return instance;
}

registerComponent(componentReference, createSamplecomponentInstance);

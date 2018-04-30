/**
 * @module bootstrap-sample
 * @version 1.0.0
 * @since Thu Mar 08 2018
 */

// dependencies
const flight = require('flightjs');
// other dependencies
/*
	if needed we can add flight-with-state,
	flight-with-resources, flight-with-child-components etc
*/

/* Component definition */
function createSampleflightInstance() {
	// add attributes here
	this.attributes({
		// selectors
		// helloText: '.sample-flight__js-elem',
		// variables
		// someVariable: 1
	});

	/* initialize the states you want to add
	   Include flight-with-state on top
	*/
	/* this.initialState({
		sampleState: true
	}); */

	// custom methods
	/*  this.customMethod = function () {
		    alert(this.select('helloText').html());
	};  */

	// add event listeners to the component
	this.addListeners = function () {
		/* this.on('click', {
			helloText: this.customMethod
		}); */
	};

	// after initializing the component
	this.after('initialize', function () {
		this.addListeners();
	});
}

/* Creat & Attach the component to a DOM node */
const componentInstance = flight.component(createSampleflightInstance);
componentInstance.attachTo('.app-js__sample-flight');

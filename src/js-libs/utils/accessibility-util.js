export function toggleAria(element, property) {
	if (element && element.hasAttribute(`aria-${property}`)) {
		const currentState = element.getAttribute(`aria-${property}`);
		let newState;

		if (currentState === 'false') {
			newState = 'true';
		} else {
			newState = 'false';
		}
		element.setAttribute(`aria-${property}`, newState);
	}
}

export function removeAriaAttribute(element, property) {
	if (element) {
		element.removeAttribute(`aria-${property}`);
	}
}

export function updateAriaAttribute(elements, property, value) {
	if (elements) {
		elements.forEach(element => {
			if (element && element.hasAttribute(`aria-${property}`)) {
				element.setAttribute(`aria-${property}`, value);
			}
		});
	}
}

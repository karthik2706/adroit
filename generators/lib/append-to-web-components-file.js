/**
 * Utility to add elements to webpack-component.js file
 *
 * Can be used to add components directly or can be used while creating a directry also.
 *
 * if isDirectory = true, dir = directory name ==> appends a root directory that was created in parallel to common folder
 * if isDirectory = false, dir = directory name , compName= component name ==> adds components reference after creating it
 */
'use strict';

const FS = require('fs');
const PROJECT_CONFIG = require('../../project-config');
const { HBS_DEPENDENCY_POINT } = PROJECT_CONFIG;

module.exports = (isDirectory, dir, compName) => {
	isDirectory = isDirectory || false;
	let baseDir = dir;
	let listItem = '';

	if (isDirectory) {
		listItem = baseDir + '/components-entry';
	} else {
		if (baseDir.length > 0) {
			baseDir = dir;
			if (baseDir[baseDir.length - 1] !== '/') {
				baseDir = baseDir + '/';
			}
		}
		listItem = baseDir + compName;
	}

	// FS.appendFile('webpack-components.js', "\nlist.push('" + listItem + "');");

	FS.appendFile(
		`${HBS_DEPENDENCY_POINT}/components.js`,
		"require('fe-components/" + listItem + "');\n"
	);
};

/**
 * This module checks if a folder/directory is already present in a given root folder
 */
const recursive = require('recursive-readdir');
const nodePath = require('path');

module.exports = (dirName, root, callBack) => {
	// console.log('checking if ' + dirName + ' directory is present in \'' + root + '\' directory');

	let allDirectories = [];
	let dir = '';
	let response = {
		present: false,
		path: '',
		name: dirName
	};

	recursive(root, function(err, files) {
		files.forEach(file => {
			dir = nodePath.dirname(file);
			if (allDirectories.indexOf(dir) === -1) {
				allDirectories.push(nodePath.normalize(dir));
			}
		});

		// removing fe-components folder from stack
		allDirectories.shift();
		allDirectories.forEach(dir => {
			let extractedDir = dir.split(nodePath.sep).pop();
			if (extractedDir === dirName) {
				response.path = nodePath.dirname(nodePath.normalize(dir));
				response.present = true;
			}
		});

		callBack(response);
	});
};

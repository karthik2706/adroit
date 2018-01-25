const fs = require('fs');
const { resolve } = require('path');

const PROJECT_CONFIG = require('../project-config.js');

module.exports = function getEntriesConfig(options) {
	const dirName = resolve(PROJECT_CONFIG.HBS_DEPENDENCY_POINT);
	const entries = {};
	const files = fs.readdirSync(dirName);
	files.forEach(file => {
		const fileNameWithoutExt = file.slice(0, file.length - 3);
		entries[fileNameWithoutExt] = `${dirName}/${file}`;
	});

	entries.vendor = ['react', 'lib/component-register.js'];

	return entries;
};

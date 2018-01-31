'use strict';

const argv = require('minimist')(process.argv.slice(2));
const configFile = require('../project-config');
const componentsDir = configFile.HBS_FE_COMPONENTS;
const capitalize = require('./lib/capitalize-first-letter');
const dashToCamelCase = require('./lib/dash-to-camelcase');
const replaceAll = require('./lib/string-replace-all');
const folderExists = require('./lib/folder-exists.js');
const createDirectories = require('./lib/check-create-directories.js');
const createComponent = require('./lib/create-component.js');
const getDirPath = require('./lib/directory-path');
let originalDir = argv.dir || '';

function noop() {}

// set dir path to default
argv.dir = argv.dir !== undefined ? componentsDir + argv.dir : componentsDir;

if (typeof argv.name !== 'string' || typeof argv.dir !== 'string') {
	throw new Error('Must pass name and path to directory: --name x --dir y');
}

const componentName = argv.name;
let dir = getDirPath(argv.dir);

if (originalDir.length > 0) {
	originalDir = originalDir + '/';
}

const componentRoot = originalDir.split('/')[0];
const componentRootPath = getDirPath(componentsDir + componentRoot);
const today = new Date().toDateString();
const fullPath = dir + componentName;
const moduleName = dashToCamelCase(componentName);
const separateComponentName = replaceAll(capitalize(componentName.split('-').join(' ')), ' ', '');
const regexpObjectList = [
	{
		pattern: '{component-name}',
		newSubStr: componentName
	},
	{
		pattern: '{separate-component-name}',
		newSubStr: separateComponentName.replace(/\s+/g, '')
	},
	{
		pattern: '{module-name}',
		newSubStr: moduleName
	},
	{
		pattern: '{date}',
		newSubStr: today
	},
	{
		pattern: '{version}',
		newSubStr: '1.0.0'
	},
	{
		pattern: '{dir}',
		newSubStr: originalDir
	}
];

// Check if folder with given component name exist
folderExists(componentName, componentsDir, folderStats => {
	if (folderStats.present) {
		console.info(
			'\nThis component "' +
				componentName +
				'" already present at "' +
				folderStats.path +
				'"\n'
		);
		return noop;
	} else {
		createDirectories(originalDir, componentsDir, () => {
			// Once directories are created then look into
			createComponent(componentName, dir, regexpObjectList, () => {
				console.log('\n' + componentName + ' component created\n');
			});
		});
	}
});

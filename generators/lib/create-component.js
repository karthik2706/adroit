/**
 * Replicated template folder as component
 * creates in specified path
 */

const fs = require('fs');
const nodePath = require('path');
const mkdirp = require('mkdirp');
const templatesPath = nodePath.dirname(__dirname) + '/templates';
const find = require('list-files');
const resolvePaths = require('./resolve-paths');
const stringIsNotEmpty = require('./string-is-not-empty');
const isWindows = require('./is-windows');
const replaceAll = require('./string-replace-all');
const replaceFirst = require('./string-replace-first');
const generateFile = require('./generate-file');
const appendToWebpackComponentsFile = require('./append-to-web-components-file.js');

let compName = '';
let fullPath = '';
let regexpObjectList = [];

module.exports = (componentName, path, references, callBack) => {
	const compPath = path + componentName;

	// making componentName and path available to scope of this file
	compName = componentName;
	fullPath = compPath;
	regexpObjectList = references;

	find(
		result => {
			const paths = resolvePaths(result);

			// create component's directory
			mkdirp(compPath);

			// iterate through the template files, add them into component's folder, replace names with component name (file names and variables inside files)
			iterateFiles(paths);

			// Check if component is getting created under fe-components.
			if (isComponentsRoot(path)) {
				// If this component is getting created under fe-components then,
				// make entry in components.scss and webpack-components.js

				// make an entry in webpack-components.js
				appendToWebpackComponentsFile(false, '', componentName + '/' + componentName);

				// make an entry in components.scss in fe-components folder
				// fs.appendFile(
				//     path + "components.scss",
				//     "\n@import '"+ componentName +"/"+ componentName +".scss';"
				// );
			} else {
				const folderPathsObj = getParentFolderPath(nodePath.dirname(compPath), '');
				// make an entry in component's parent/components-entry.js
				fs.appendFile(
					folderPathsObj.curFolderPath + '/components-entry.js',
					"\nrequire('./" +
						folderPathsObj.poppedPath +
						componentName +
						'/' +
						componentName +
						".js');"
				);

				// make an entry in component's parent/components-entry.scss
				fs.appendFile(
					folderPathsObj.curFolderPath + '/components-entry.scss',
					"\n@import '" +
						folderPathsObj.poppedPath +
						componentName +
						'/' +
						componentName +
						".scss';"
				);
			}

			callBack();
		},
		{
			dir: templatesPath,
			isAbsolutePath: true
		}
	);
};

function iterateFiles(files) {
	const fileNames = files
		.map(getFileName)
		.filter(stringIsNotEmpty)
		.map(replaceWithComponentName);
	files.filter(removeNoTemplateFile).forEach(handleFiles(fileNames));
}

function getFileName(filePath) {
	const i = filePath.indexOf(templatesPath);
	return filePath.substring(i + templatesPath.length + 1);
}

function replaceWithComponentName(name) {
	return replaceFirst(name, 'template', compName);
}

function removeNoTemplateFile(str) {
	if (isWindows()) {
		str = str.replace(/\//g, '\\');
		return str.indexOf(templatesPath.replace(/\//g, '\\') + '\\') > -1;
	}
	return str.indexOf(templatesPath + '/') > -1;
}

function handleFiles(fileNames) {
	return (templateFile, i) => {
		fs.readFile(templateFile, 'utf8', (err, data) => {
			if (err) {
				console.log(err);
				return;
			}
			const path = getPath(templateFile);
			regexpObjectList.forEach(regexpObject => {
				data = replaceAll(data, regexpObject.pattern, regexpObject.newSubStr);
			});
			generateFile(data, path + fileNames[i]);
		});
	};
}

function getPath(fileName) {
	const path = fullPath + '/';
	return path;
}

function isComponentsRoot(path) {
	let componentsDir = require('../../config').componentsDir;
	componentsDir = componentsDir.split('/');
	const rootComponentDir = componentsDir[componentsDir.length - 2];

	path = path.split('/');
	const folderName = path[path.length - 2];

	return folderName === rootComponentDir;
}

function getParentFolderPath(curFolderPath, path) {
	try {
		const resp = fs.openSync(curFolderPath + '/components-entry.js', 'r');
		return {
			curFolderPath: curFolderPath,
			poppedPath: path
		};
	} catch (error) {
		return getParentFolderPath(
			nodePath.dirname(curFolderPath),
			curFolderPath.split(nodePath.sep).pop() + nodePath.sep + path
		);
	}
}

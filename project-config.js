/*
* Project Setting & Configuration
* Compilation : Handlebars, Assembler, ReactJS, SCSS
* Build Tool : Webpack v3
*/

// Application
const APP_NAME = 'New Web Design';
const APP_TITLE = 'XYZ E-Cart';
const VERSION = 'v1-0-0';

// Source Code
const SOURCE_ROOT_FOLDER = 'src';

// Common JS Library/Code
const JS_LIB = `${SOURCE_ROOT_FOLDER}/lib`;

// Handlebars
const HANDLEBARS_DIR = `${SOURCE_ROOT_FOLDER}/hbs-app`;
const HBS_FE_COMPONENTS = `${HANDLEBARS_DIR}/fe-components`;
const HBS_FE_LAYOUTS = `${HANDLEBARS_DIR}/layouts`;
const HBS_FE_PAGES = `${HANDLEBARS_DIR}/pages`;

// HBS JS Bundling - For Chunking
const HBS_DEPENDENCY_POINT = `${HANDLEBARS_DIR}/hbs-bundles`;

// Style Bundling
const STYLESHEETS = `${SOURCE_ROOT_FOLDER}/stylesheets`;

// Assets for Copying to Server
const ASSETS_SRC = `${SOURCE_ROOT_FOLDER}/assets`; // [Fonts, Images, Videos, Docs etc]

// Generated Output Folder for Distribution
const WEB_ROOT = 'www-root'; // Serve this folder in webpack-dev-server [Include Mock JSON here]

// Generated output folder name for respective file types
const OUTPUT_JS_FOLDER = 'js';
const OUTPUT_CSS_FOLDER = 'css';
const OUTPUT_ASSETS_FOLDER = 'assets'; // Public Folder

/*
*    /site-name  => If site is hosted on Shared Machine
*    /           => If site is hosted on Dedicated Machine
*/
const APP_PUBLIC_PATH = 'xyz-webiste';

// Webpack-Dev-Server
const DEV_SERVER_HOST = 'localhost'; // Use 0.0.0.0 if wanted to access it over LAN using Machine IP address
const DEV_SERVER_PORT = 6565;
const API_BASE_URL = 'http://<HOST_NAME>:<PORT>'; // Without Ending '/'

module.exports = {
	APP_NAME,
	APP_TITLE,
	VERSION,

	SOURCE_ROOT_FOLDER,
	JS_LIB,
	HANDLEBARS_DIR,
	HBS_FE_COMPONENTS,
	HBS_FE_LAYOUTS,
	HBS_FE_PAGES,
	HBS_DEPENDENCY_POINT,
	STYLESHEETS,
	ASSETS_SRC,
	WEB_ROOT,
	OUTPUT_JS_FOLDER,
	OUTPUT_CSS_FOLDER,
	OUTPUT_ASSETS_FOLDER,
	APP_PUBLIC_PATH,
	DEV_SERVER_HOST,
	DEV_SERVER_PORT,
	API_BASE_URL
};

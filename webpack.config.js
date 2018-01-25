/* eslint-disable global-require */
const { resolve } = require('path');
const PROJECT_CONFIG = require('./project-config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin(`${PROJECT_CONFIG.OUTPUT_CSS_FOLDER}/bundle.[name].css`);

module.exports = (env = {}) => {
	console.log('>>>> env  : ', env);

	const IS_PRODUCTION_MODE = !env.dev;
	const IS_ANALYSE_BUILD = env.analyse || false;
	const IS_MOCK_SERVER = env.mock || true;
	const IS_ABSOLUTE_API_PATH = env.absoluteApiPath || false;
	const { APP_PUBLIC_PATH } = PROJECT_CONFIG;

	const WEBPACK_UTILS = require('./webpack-settings/webpack-utils')({
		IS_PRODUCTION_MODE,
		IS_ANALYSE_BUILD,
		IS_MOCK_SERVER,
		IS_ABSOLUTE_API_PATH,
		APP_PUBLIC_PATH
	});

	// Webpack Entries
	const ENTRIES = require('./webpack-settings/webpack.entry')({});

	// Webpack rules
	const RULES = require('./webpack-settings/webpack.rules')({
		IS_PRODUCTION_MODE,
		extractCSS,
		APP_PUBLIC_PATH
	});

	// Webpack plugins
	const PLUGINS = require('./webpack-settings/webpack.plugins')({
		IS_PRODUCTION_MODE,
		IS_ANALYSE_BUILD,
		IS_ABSOLUTE_API_PATH,
		APP_PUBLIC_PATH,
		extractCSS
	});

	// Webpack Dev-Server
	const devServer = require('./webpack-settings/webpack.dev-server')({
		IS_MOCK_SERVER,
		APP_PUBLIC_PATH
	});

	WEBPACK_UTILS.printDetails();

	const config = {
		// context: resolve(PROJECT_CONFIG.SOURCE_ROOT_FOLDER),
		entry: ENTRIES,
		output: {
			path: resolve(PROJECT_CONFIG.WEB_ROOT, APP_PUBLIC_PATH),
			filename: `${PROJECT_CONFIG.OUTPUT_JS_FOLDER}/bundle.[name].js`,
			publicPath: APP_PUBLIC_PATH,
			pathinfo: !IS_PRODUCTION_MODE
		},
		devtool: 'source-map',
		module: {
			rules: RULES
		},
		plugins: PLUGINS,
		resolve: {
			alias: {
				lib: resolve(PROJECT_CONFIG.JS_LIB),
				handlebars: resolve(PROJECT_CONFIG.HANDLEBARS_DIR),
				'fe-components': resolve(PROJECT_CONFIG.HBS_FE_COMPONENTS),
				stylesheets: resolve(PROJECT_CONFIG.STYLESHEETS)
			},
			extensions: ['.js', '.jsx', '.scss']
		},
		stats: {
			children: false
		},
		devServer
	};

	if (env && env.debug) {
		console.log('wepack.config: ', config);
	}

	return config;
};

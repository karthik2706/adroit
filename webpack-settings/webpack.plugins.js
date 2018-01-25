const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const assembleWebpack = require('assemble-webpack');

const PROJECT_CONFIG = require('../project-config.js');

const { HANDLEBARS_DIR } = PROJECT_CONFIG;

module.exports = function getPlugins(options) {
	let API_BASE_URL = false;

	if (options.IS_ABSOLUTE_API_PATH) {
		API_BASE_URL = JSON.stringify(PROJECT_CONFIG.API_BASE_URL);
	}

	const plugins = [
		new CaseSensitivePathsPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			VERSION: JSON.stringify('Some Random Version'), // This Returns a String else 'PURE TEXT WITHOUT  quote'
			ASSETS_PUBLIC_PATH: JSON.stringify(`/${options.APP_PUBLIC_PATH}/assets`),
			IS_MOCK_SERVER: options.IS_MOCK_SERVER,
			API_BASE_URL,
			APP_PUBLIC_PATH: JSON.stringify(options.APP_PUBLIC_PATH)
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			Popper: 'popper.js',
			toastr: 'toastr'
		}),
		options.extractCSS,
		new CopyWebpackPlugin([
			{
				from: PROJECT_CONFIG.ASSETS_SRC,
				to: PROJECT_CONFIG.ASSETS_DEST
			}
		]),

		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new assembleWebpack.AttachedPlugin({
			baseLayout: `${HANDLEBARS_DIR}/layouts/base.hbs`,
			basePages: [`${HANDLEBARS_DIR}/pages/**/*.hbs`],
			partialsLayout: [`${HANDLEBARS_DIR}/fe-components/**/*.hbs`],
			partialsData: [
				`${HANDLEBARS_DIR}/fe-components/**/*.json`,
				`${HANDLEBARS_DIR}/layouts/**/*.json`,
				`${HANDLEBARS_DIR}/pages/**/*.json`
			]
		})
	];

	if (options.IS_ANALYSE_BUILD) {
		plugins.push(
			new Visualizer({
				filename: '../build-analysis/statistics.html'
			})
		);
	}

	return plugins;
};

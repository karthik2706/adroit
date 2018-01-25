const PROJECT_CONFIG = require('../project-config.js');
const { resolve } = require('path');
const fs = require('fs');

module.exports = function getDevServerConfig(options) {
	const HOST_NAME = PROJECT_CONFIG.DEV_SERVER_HOST;
	const PORT = PROJECT_CONFIG.DEV_SERVER_PORT;

	const devServer = {
		contentBase: resolve(PROJECT_CONFIG.WEB_ROOT),
		host: HOST_NAME,
		port: PORT,
		compress: true,
		disableHostCheck: true,
		noInfo: false,
		stats: {
			// Config for minimal console.log mess.
			assets: true,
			colors: true,
			version: false,
			hash: false,
			timings: false,
			chunks: false,
			chunkModules: false,
			children: false
		},
		open: true
		// inline: true,
		// historyApiFallback: {
		// 	index: `/${options.APP_PUBLIC_PATH}/`
		// }
	};

	// console.log('>>>> options.IS_MOCK_SERVER : ', options.IS_MOCK_SERVER);
	if (options.IS_MOCK_SERVER) {
		// devServer.proxy = {
		// 	// https://github.com/chimurai/http-proxy-middleware#context-matching
		// 	// '/example/api': { // Startng with /example/api and ending with anything
		// 	// '**/anything': { // Staring with anything but ending with anything
		// 	// '**/anything/**': { // This goes in infinite loop - If Absolute JSON is not returned

		// 	'/api': { // Anything Starting with /api on server and ending with anything
		// 		target: `http://${HOST_NAME}:${PORT}/mock-json`,
		// 		pathRewrite(req, optionsObj) {
		// 			console.log('>>>> GET req: ', req);
		// 			// console.log('>>>> optionsObj: ', optionsObj);
		// 			return `${req}.json`;
		// 		}
		// 	}
		// };
		devServer.setup = function handleAPIRequest(app) {
			app.all('/api/**', (req, res) => {
				// console.log('>>> req.url : ', req.url);
				// console.log('>>> req.baseUrl : ', req.baseUrl);
				// console.log('>>> req.hostname : ', req.hostname);
				// console.log('>>> req.originalUrl : ', req.originalUrl);
				// console.log('>>> req.params : ', req.params);
				// console.log('>>> req.query : ', req.query);

				// console.log('>>> req.baseUrl : ', req.baseUrl);
				// console.log('>>> req.baseUrl : ', req.baseUrl);
				console.log('>>> req.path : ', req.path);
				console.log('>>> req.method : ', req.method);
				// console.log('>>>>>> req: ', req);

				const requestedPath = req.path;
				const derivedMockPath = `${requestedPath}/${req.method}`;

				// if(req.query) {
				// 	derivedMockPath = derivedMockPath +
				// }

				// console.log(`>>>> API Request\n\tMethod : ${req.method}\n\tUrl : ${requestedUrl}`);

				const mockPath = resolve(`${PROJECT_CONFIG.WEB_ROOT}/mock-json/`);
				const jsonResponse = JSON.parse(
					fs.readFileSync(`${mockPath}${derivedMockPath}.json`, 'utf8')
				);
				res.json(jsonResponse);
			});
		};
	}

	return devServer;
};

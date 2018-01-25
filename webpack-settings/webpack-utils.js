function getSourceMap(env) {
	let sourceMap = 'source-map'; // 'eval';

	if (env && !!env.prod) {
		sourceMap = 'source-map';
	}
	return sourceMap;
}

// module.exports = {
// 	getSourceMap,
// 	printDetails
// };

module.exports = function webpackUtils(options) {
	function printDetails() {
		/* eslint-disable no-console */
		console.log('---------------------------------------------------');
		console.log(
			'      BUILD ENVIRONMENT          :     ',
			options.IS_PRODUCTION_MODE ? 'Production' : 'Development'
		);
		console.log('      APPLICATION PUBLIC PATH    :     ', options.APP_PUBLIC_PATH);
		console.log('      IS_ABSOLUTE_API_PATH       :     ', options.IS_ABSOLUTE_API_PATH);
		console.log('      IS_MOCK_SERVER             :     ', options.IS_MOCK_SERVER);
		console.log('      ANALYSE BUNDLE             :     ', options.IS_ANALYSE_BUILD);
		console.log('---------------------------------------------------');
		/* eslint-enable no-console */
	}

	return {
		printDetails
	};
};

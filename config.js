'use strict';

const root = './';
const src = root + 'web/';

// Project Assets
const srcAssetsFiles = src + 'webroot/_ui/responsive/app/';
const srcCss = srcAssetsFiles + 'scss';
const srcImages = srcAssetsFiles + 'images';
const srcFonts = srcAssetsFiles + 'fonts';
const srcAPI = srcAssetsFiles + 'api';
const srcJs = srcAssetsFiles + 'js';
const templatesSrc = srcAssetsFiles + 'templates';

// Handlebar & Assemble
const markupSrc = src + 'webroot/WEB-INF/';
const layoutsSrc = markupSrc + 'layouts';
const pagesSrc = markupSrc + 'pages';
const componentsSrc = markupSrc + 'fe-components';
const srcSass = componentsSrc + '/components.scss';

// Project Output
const distDir = root + 'dist/';
const distJs = distDir + 'js';
const distCss = distDir + 'css';
const distImg = distDir + 'images';
const distFonts = distDir + 'fonts';
const distAPIs = distDir + 'api';
const distTemplates = distJs + '/templates';
const helpers = root + 'libs/helpers';

exports.base = {
	root,
	src,
	srcAssetsFiles,
	srcSass,
	srcCss,
	srcImages,
	srcFonts,
	srcJs,
	markupSrc,
	layoutsSrc,
	pagesSrc,
	componentsSrc,
	distDir,
	distJs,
	distCss,
	distImg,
	distFonts,
	distAPIs,
	distTemplates
};

exports.filePath = {
	html: {
		all: [componentsSrc + '/**/*.hbs', layoutsSrc + '/**/*.hbs', pagesSrc + '/**/*.hbs'],
		// data: componentsSrc + '/**/*.json',
		layouts: layoutsSrc + '/**/*.hbs',
		templatesSrc: templatesSrc + '/*.hbs',
		partials: [componentsSrc + '/**/*.hbs'],
		pages: pagesSrc + '/**/*.hbs',
		data: [componentsSrc + '/**/*.json', layoutsSrc + '/**/*.json', pagesSrc + '/**/*.json'],
		helpers: helpers + '/*.js',
		assets: srcAssetsFiles,
		compiledSrc: distDir,
		compiledHTML: distDir + '/**/*.html'
	},

	styles: {
		sassOptions: {
			errLogToConsole: true,
			outputStyle: 'compressed'
		},
		autoprefixerOptions: {
			browsers: ['last 2 versions', '> 1%', 'Firefox ESR', 'ie > 9']
		},
		sassdocOptions: {
			dest: 'dist/sassdoc'
		},
		fontsScss: srcCss + '/fonts.scss',
		scssConcat: componentsSrc + '/components.scss',
		printScss: srcCss + '/print.scss',
		distCss: distDir + 'css'
	},

	scripts: {
		allJsFiles: [componentsSrc + '/**/*.js', srcJs + '/**/*.js'],
		componentsEntry: componentsSrc + '/components-entry.js',
		vendorLibs: [
			srcJs + '/vendor/modernizr.js',
			srcJs + '/vendor/jquery.js',
			srcJs + '/vendor/*.js'
		]
	},

	copyfiles: {
		fonts: srcFonts + '/**/*',
		img: srcImages + '/**/*',
		styles: srcCss + '/*.css',
		sourcemaps: srcCss + '/**/*.map',
		api: srcAPI + '/**/*',
		distJs: distJs + '/**/*',
		distCss: distCss + '/**/*',
		distImg: distImg + '/**/*',
		distFonts: distFonts + '/**/*',
		distTemplates: distTemplates + '/**/*'
	}
};

exports.componentsDir = componentsSrc + '/';
exports.templatesDir = 'generators/';

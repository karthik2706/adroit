const path = require('path');
const config = require('./config');
const base = config.base;
const nodeModulesRoot = path.resolve('./node_modules');
const project = path.join(__dirname, '/');

module.exports = {
    resolve: {
        root: [
            project,
            project + 'lib',
            project + 'node_modules',
            project + 'web/webroot/_ui/responsive/app/js/libs',
            project + 'web/webroot/WEB-INF/fe-components'
        ],
        alias: {
            'handlebars': 'handlebars/dist/handlebars.js'
        },
        extensions: ['', '.js', '.es6', '.jsx']
    },
    resolveLoader: {
        root: nodeModulesRoot
    },
    entry: {
        'app': base.componentsSrc + '/components-entry'
    },
    target: 'web',
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: '[name].js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].js'
    },
    module: {
        loaders: [{
            test: /\.(html|hbs)$/,
            loader: 'raw',
            exclude: /(node_modules)/
        }, {
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel',
            query: {
                presets: [ 'es2015', 'stage-1'],
                compact: false
            }
        }]
    },
    node: {
        fs: 'empty'
    }
};

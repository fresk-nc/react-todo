const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const clientPath = path.join(__dirname, 'client');

module.exports = {
    context: clientPath,
    entry: {
        vendor: [
            'classnames',
            'react',
            'react-dom',
            'react-addons-css-transition-group',
            'react-redux',
            'react-intl',
            'react-intl-redux',
            'redux',
            'redux-optimist',
            'immutable/dist/immutable.js',
            'keymirror',
            'whatwg-fetch'
        ],
        index: './index.js'
    },
    resolve: {
        extensions: [ '', '.js', '.json', '.styl' ],
        alias: {
            actions: path.join(clientPath, 'actions'),
            components: path.join(clientPath, 'components'),
            constants: path.join(clientPath, 'constants'),
            containers: path.join(clientPath, 'containers'),
            middleware: path.join(clientPath, 'middleware'),
            records: path.join(clientPath, 'records'),
            reducers: path.join(clientPath, 'reducers'),
            loc: path.join(clientPath, 'loc'),
            utils: path.join(clientPath, 'utils')
        }
    },
    resolveLoader: {
        modulesDirectories: [ 'node_modules' ],
        moduleTemplates: [ '*-loader', '*' ],
        extensions: [ '', '.js' ]
    },
    module: {
        noParse: [
            /node_modules[\/\\]immutable[\/\\]dist[\/\\]immutable.js/
        ],
        loaders: [

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: './favicon.ico',
            inject: 'body',
            template: path.join(clientPath, 'index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                preserveLineBreaks: true
            }
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom'
        })
    ],
    postcss: function() {
        return [
            autoprefixer({
                browsers: [ 'last 2 versions' ]
            })
        ];
    }
};

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const clientPath = path.join(__dirname, 'client');
const staticPath = path.join(__dirname, 'static');
const baseConfig = require('./webpack.config.base.js');
const config = Object.create(baseConfig);

config.entry = {
    vendor: [
        'classnames',
        'react',
        'react-dom',
        'react-addons-css-transition-group',
        'react-addons-pure-render-mixin',
        'react-redux',
        'redux',
        'redux-optimist',
        'immutable/dist/immutable.js',
        'keymirror'
    ],
    index: './index.js'
};

config.output = {
    filename: '[chunkhash]-[name].js',
    path: staticPath
};

config.module.loaders.push(
    {
        test: /\.js$/,
        loaders: [ 'babel' ],
        include: [ clientPath ]
    },
    {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!stylus')
    }
);

config.postcss = function() {
    return [
        autoprefixer({
            browsers: [ 'last 2 versions' ]
        })
    ];
};

config.plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
        inject: 'body',
        template: path.join(clientPath, 'index.html'),
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            preserveLineBreaks: true
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: '[chunkhash]-[name].js'
    }),
    new webpack.DefinePlugin({
        '__DEV__': false,
        'NODE_ENV': 'production',
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    new ExtractTextPlugin('[chunkhash]-[name].css', {
        allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
        output: {
            comments: false
        },
        compress: {
            warnings: false
        }
    })
);

module.exports = config;

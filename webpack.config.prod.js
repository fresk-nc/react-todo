/* eslint-disable max-len */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const clientPath = path.join(__dirname, 'client');
const staticPath = path.join(__dirname, 'static');
const baseConfig = require('./webpack.config.base.js');
const config = Object.create(baseConfig);

config.output = {
    filename: '[chunkhash]-[name].js',
    path: staticPath
};

config.module.loaders.push(
    {
        test: /\.js$/,
        loader: 'babel',
        query: {
            plugins: [
                'transform-object-assign'
            ]
        },
        include: [ clientPath ]
    },
    {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!stylus')
    }
);

config.plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(),
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

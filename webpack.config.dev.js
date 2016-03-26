const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const clientPath = path.join(__dirname, 'client');
const staticPath = path.join(__dirname, 'static');
const baseConfig = require('./webpack.config.base.js');
const config = Object.create(baseConfig);

config.devtool = 'eval';

config.entry = {
    index: './index.js'
};

config.output = {
    filename: '[name].js',
    path: staticPath
};

config.module.loaders.push(
    {
        test: /\.js$/,
        loaders: [ 'react-hot', 'babel' ],
        include: [ clientPath ]
    },
    {
        test: /\.styl$/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!stylus'
    }
);

config.plugins.push(
    new HtmlWebpackPlugin({
        inject: 'body',
        template: path.join(clientPath, 'index.html')
    }),
    new webpack.DefinePlugin({
        '__DEV__': true,
        'NODE_ENV': 'development',
        'process.env': {
            'NODE_ENV': JSON.stringify('development')
        }
    })
);

config.devServer = {
    proxy: {
        '*': 'http://localhost:8000'
    },
    watchOptions: {
        aggregateTimeout: 300,
            poll: true
    }
};

module.exports = config;

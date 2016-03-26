const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const clientPath = path.join(__dirname, 'client');
const staticPath = path.join(__dirname, 'static');
const serverConfig = require('./server/config.js');
const baseConfig = require('./webpack.config.base.js');
const config = Object.create(baseConfig);

config.devtool = 'eval';

config.entry = [
    `webpack-hot-middleware/client?path=http://localhost:${serverConfig.port}/__webpack_hmr`,
    './index.js'
];

config.output = {
    filename: 'bundle.js',
    path: staticPath,
    publicPath: '/'
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
    new webpack.HotModuleReplacementPlugin(),
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

module.exports = config;

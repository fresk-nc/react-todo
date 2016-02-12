var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

var nodeEnv = process.env.NODE_ENV || 'development';
var isDev = (nodeEnv === 'development');
var clientPath = path.join(__dirname, 'client');
var staticPath = path.join(__dirname, 'static');

var config = {
    devtool: isDev ? 'eval' : null,
    context: clientPath,
    entry: {
        vendor: [
            'classnames',
            'events',
            'react',
            'react-dom',
            'react-addons-css-transition-group',
            'react-addons-pure-render-mixin',
            'react-addons-linked-state-mixin',
            'flux/dist/Flux.js',
            'immutable/dist/immutable.js',
            'keymirror'
        ],
        index: './index.js'
    },
    output: {
        filename: isDev ? '[name].js' : '[chunkhash]-[name].js',
        path: staticPath
    },
    resolve: {
        extensions: ['', '.js', '.styl'],
        alias: {
            actions: path.join(clientPath, 'actions'),
            components: path.join(clientPath, 'components'),
            constants: path.join(clientPath, 'constants'),
            services: path.join(clientPath, 'services'),
            stores: path.join(clientPath, 'stores'),
            dispatcher: path.join(clientPath, 'dispatcher')
        }
    },
    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        
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
            filename: isDev ? '[name].js' : '[chunkhash]-[name].js'
        }),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(nodeEnv),
            'process.env.NODE_ENV': JSON.stringify(nodeEnv)
        }),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom'
        }),
        new ExtractTextPlugin(isDev ? '[name].css' : '[chunkhash]-[name].css', {
            allChunks: true,
            disable: isDev
        })
    ],
    module: {
        noParse: [
            /node_modules[\/\\]flux[\/\\]dist[\/\\]Flux.js/,
            /node_modules[\/\\]immutable[\/\\]dist[\/\\]immutable.js/
        ],
        loaders: [
            {
                test: /\.js$/,
                loaders: isDev ? ['react-hot', 'babel'] : ['babel'],
                include: [clientPath]
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!stylus')
            }
        ]
    },
    postcss: function () {
        return [
            autoprefixer({
                'browsers': ['last 2 versions']
            })
        ];
    },
    devServer: {
        proxy: {
            '*': 'http://localhost:8000'
        },
        watchOptions: {
            aggregateTimeout: 300,
            poll: true
        }
    }
};

if (!isDev) {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        })
    );
}

module.exports = config;
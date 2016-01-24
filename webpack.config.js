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
            'flux/dist/Flux.js',
            'keymirror'
        ],
        index: './index.js'
    },
    output: {
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
            filename: 'vendor.js'
        }),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(nodeEnv)
        }),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom'
        }),
        new ExtractTextPlugin('[name].css', {
            allChunks: true
        })
    ],
    module: {
        noParse: [
            /node_modules[\/\\]flux[\/\\]dist[\/\\]Flux.js/
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: [clientPath]
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('css!postcss!stylus')
            }
        ]
    },
    postcss: function () {
        return [
            autoprefixer({
                'browsers': ['last 2 versions']
            })
        ];
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
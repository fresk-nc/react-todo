var path = require('path');
var webpack = require('webpack');

var testPath = path.join(__dirname, 'test');
var clientPath = path.join(__dirname, 'client');

module.exports = function(config) {
    config.set({
        frameworks: ['mocha', 'sinon-chai'],
        files: [
            'test/helpers/setup.js',
            'test/spec/**/*.js'
        ],
        preprocessors: {
            'test/**/*.js': ['webpack']
        },
        webpack: {
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
            plugins: [
                new webpack.DefinePlugin({
                    NODE_ENV: JSON.stringify('development'),
                    'process.env.NODE_ENV': JSON.stringify('development')
                }),
                new webpack.ProvidePlugin({
                    React: 'react',
                    ReactDOM: 'react-dom'
                })
            ],
            module: {
                noParse: [
                    /node_modules[\/\\]immutable[\/\\]dist[\/\\]immutable.js/,
                    /node_modules[\/\\]flux[\/\\]dist[\/\\]Flux.js/
                ],
                loaders: [
                    {
                        test: /\.js$/,
                        loader: 'babel',
                        query: {
                            plugins: [
                                'transform-object-assign'
                            ]
                        },
                        include: [clientPath, testPath]
                    },
                    {
                        test: /\.styl$/,
                        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!stylus'
                    }
                ]
            }
        },
        webpackMiddleware: {
            noInfo: true
        },
        reporters: ['progress'],
        browsers: ['PhantomJS'],
        singleRun: true
    });
};

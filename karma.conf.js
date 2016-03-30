var path = require('path');
var webpack = require('webpack');

var testPath = path.join(__dirname, 'test');
var clientPath = path.join(__dirname, 'client');

module.exports = function(config) {
    config.set({
        frameworks: ['mocha', 'chai-immutable', 'sinon-chai'],
        files: [
            'test/helpers/setup.js',
            'test/spec/**/*.js'
        ],
        preprocessors: {
            'test/**/*.js': ['webpack']
        },
        webpack: {
            resolve: {
                extensions: ['', '.js', '.json', '.styl'],
                alias: {
                    actions: path.join(clientPath, 'actions'),
                    components: path.join(clientPath, 'components'),
                    constants: path.join(clientPath, 'constants'),
                    containers: path.join(clientPath, 'containers'),
                    middleware: path.join(clientPath, 'middleware'),
                    reducers: path.join(clientPath, 'reducers')
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
                    /node_modules[\/\\]immutable[\/\\]dist[\/\\]immutable.js/
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
                    },
                    {
                        test: /\.json$/,
                        loader: 'json'
                    }
                ]
            },
            externals: {
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true
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

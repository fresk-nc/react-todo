const path = require('path');
const webpack = require('webpack');

const clientPath = path.join(__dirname, 'client');

module.exports = {
    context: clientPath,
    resolve: {
        extensions: [ '', '.js', '.styl' ],
        alias: {
            actions: path.join(clientPath, 'actions'),
            components: path.join(clientPath, 'components'),
            constants: path.join(clientPath, 'constants'),
            containers: path.join(clientPath, 'containers'),
            middleware: path.join(clientPath, 'middleware'),
            reducers: path.join(clientPath, 'reducers')
        }
    },
    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },
    module: {
        noParse: [
            /node_modules[\/\\]immutable[\/\\]dist[\/\\]immutable.js/
        ],
        loaders: [

        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),

        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom'
        })
    ]
};

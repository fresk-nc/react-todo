const path = require('path');
const autoprefixer = require('autoprefixer');
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
            reducers: path.join(clientPath, 'reducers'),
            loc: path.join(clientPath, 'loc')
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
    ],
    postcss: function() {
        return [
            autoprefixer({
                browsers: [ 'last 2 versions' ]
            })
        ];
    }
};

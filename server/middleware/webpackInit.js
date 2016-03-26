const webpack = require('webpack');
const webpackConfig = require('../../webpack.config.dev.js');
const compiler = webpack(webpackConfig);

module.exports = function(app) {
    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        watchOptions: {
            aggregateTimeout: 300,
            poll: true
        },
        stats: {
            colors: true
        }
    }));

    app.use(require('webpack-hot-middleware')(compiler));
};

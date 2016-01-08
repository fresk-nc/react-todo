var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);

compiler.watch({
    aggregateTimeout: 300,
    poll: true
}, (err, stats) => {
    console.log(`Rebuild in ${stats.endTime - stats.startTime} ms`);
});

app.use(express.static('static'));

app.listen(8000, 'localhost', (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://localhost:8000');
});

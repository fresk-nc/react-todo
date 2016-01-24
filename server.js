var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
var bodyParser = require('body-parser');

var app = express();
var compiler = webpack(config);

compiler.watch({
    aggregateTimeout: 300,
    poll: true
}, (err, stats) => {
    console.log(`Rebuild in ${stats.endTime - stats.startTime} ms`); // eslint-disable-line
});

app.use(express.static('static'));
app.use(bodyParser.json());
app.use('/api', (req, res) => {
    if (req.body.method === 'items') {
        res.send({
            '1': {
                id: 1,
                title: 'buy eggs',
                complete: false
            },
            '2': {
                id: 2,
                title: 'buy milk',
                complete: false
            },
            '3': {
                id: 3,
                title: 'buy bread',
                complete: true
            }
        });
    }
});

app.listen(8000, 'localhost', (err) => {
    if (err) {
        console.log(err); // eslint-disable-line
        return;
    }

    console.log('Listening at http://localhost:8000'); // eslint-disable-line
});

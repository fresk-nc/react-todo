var express = require('express');
var bodyParser = require('body-parser');
var items = require('./items.json');

var app = express();

app.use(bodyParser.json());
app.use('/api', (req, res) => {
    if (req.body.method === 'items') {
        res.send(items);
    } else {
        res.send({
            status: 'ok'
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

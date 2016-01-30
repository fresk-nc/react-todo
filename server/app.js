var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use('/api', (req, res) => {
    if (req.body.method === 'items') {
        res.send({
            '1': {
                id: 1,
                title: 'buy eggs',
                complete: false,
                isNew: false
            },
            '2': {
                id: 2,
                title: 'buy milk',
                complete: false,
                isNew: false
            },
            '3': {
                id: 3,
                title: 'buy bread',
                complete: true,
                isNew: false
            }
        });
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

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const config = require('./config.js');
const routes = require('./routes.js');
const currentUser = require('./middleware/currentUser.js');

const app = express();

morgan.token('body', (req) => JSON.stringify(req.body));

app.set('port', process.env.PORT || config.port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(currentUser);
app.use(morgan(':method :url :status :response-time ms :body'));

app.use(routes);

app.use((req, res) => {
    res.status(404);
    res.send({ error: 'Not found' });
});

app.use((err, req, res) => {
    res.status(500);
    res.send({ error: 'Server error' });
});

app.listen(app.get('port'), 'localhost', (err) => {
    if (err) {
        console.log(err); // eslint-disable-line
        return;
    }

    console.log(`Server listening on port ${app.get('port')}`); // eslint-disable-line
});

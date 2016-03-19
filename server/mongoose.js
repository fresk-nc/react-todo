'use strict';

const mongoose = require('mongoose');
const config = require('./config.js');

mongoose.connect(config.mongoose.uri, config.mongoose.options);
mongoose.connection.on('error', () => {
    console.log('Error: Could not connect to MongoDB.'); // eslint-disable-line
});

module.exports = mongoose;

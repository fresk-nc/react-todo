/* eslint-disable no-console */

'use strict';

const mongoose = require('mongoose');
const config = require('config');

mongoose.connect(config.mongoose.uri, config.mongoose.options);
mongoose.connection.on('error', () => {
    console.log('Error: Could not connect to MongoDB.');
});

module.exports = mongoose;

'use strict';

const mongoose = require('../libs/mongoose.js');

const todoSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        index: true
    },
    uid: {
        type: String
    },
    text: String,
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Todo', todoSchema);

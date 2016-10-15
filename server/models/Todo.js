'use strict';

const mongoose = require('libs/mongoose.js');
const R = require('ramda');

const todoSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        index: true
    },
    uid: String,
    text: String,
    completed: {
        type: Boolean,
        default: false
    },
    sequence: Number
}, {
    timestamps: true
});

todoSchema.statics.getPublicFields = R.pick([ 'id', 'uid', 'text', 'completed', 'sequence' ]);
todoSchema.statics.getMutableFields = R.pick([ 'text', 'completed', 'sequence' ]);

module.exports = mongoose.model('Todo', todoSchema);

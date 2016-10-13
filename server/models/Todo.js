'use strict';

const mongoose = require('libs/mongoose.js');
const R = require('ramda');

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
}, {
    timestamps: true
});

todoSchema.statics.getPublicFields = R.pick([ 'id', 'uid', 'text', 'completed' ]);
todoSchema.statics.getMutableFields = R.pick([ 'text', 'completed' ]);

module.exports = mongoose.model('Todo', todoSchema);

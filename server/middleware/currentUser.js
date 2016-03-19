'use strict';

const uuid = require('node-uuid');

module.exports = function(req, res, next) {
    let uid = req.cookies.uid;

    if (!uid) {
        uid = uuid.v1();
        res.cookie('uid', uid, {
            httpOnly: true
        });
        req.cookies.uid = uid;
    }

    next();
};

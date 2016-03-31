'use strict';

const uuid = require('node-uuid');

const YEAR_IN_MS = 31536000000;

module.exports = function(req, res, next) {
    let uid = req.cookies.uid;

    if (!uid) {
        uid = uuid.v1();
        res.cookie('uid', uid, {
            expires: new Date(Date.now() + YEAR_IN_MS),
            httpOnly: true
        });
        req.cookies.uid = uid;
    }

    next();
};

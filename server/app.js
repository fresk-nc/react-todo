/* eslint-disable no-console */

'use strict';

const path = require('path');
const koa = require('koa');
const config = require('config');
const uuid = require('node-uuid');
const router = require('./routes');
const app = koa();

app.use(require('koa-favicon')());
if (process.env.NODE_ENV !== 'development') {
    app.use(require('koa-static')(path.resolve(__dirname, '../static')));
}
app.use(require('koa-logger')());
app.use(function * (next) {
    try {
        yield* next;
    } catch (e) {
        if (e.status) {
            this.body = e.message;
            this.statusCode = e.status;
        } else {
            this.body = 'Server Error';
            this.statusCode = 500;
            console.error(e.message, e.stack);
        }
    }
});
app.use(require('koa-bodyparser')());
app.use(function * (next) {
    if (!this.cookies.get('uid')) {
        this.cookies.set('uid', uuid.v1());
    }

    yield* next;
});
app.use(router.routes());

app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
});

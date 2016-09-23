/* eslint-disable no-console */

'use strict';

const path = require('path');
const koa = require('koa');
const config = require('config');
const router = require('./routes');
const app = koa();

app.use(require('koa-favicon')());
if (process.env.NODE_ENV !== 'development') {
    app.use(require('koa-static')(path.resolve(__dirname, '../static')));
}
app.use(require('koa-logger')());
app.use(require('./middlewares/errors.js'));
app.use(require('koa-bodyparser')());
app.use(require('./middlewares/user.js'));
app.use(router.routes());

app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
});

'use strict';

const Router = require('koa-router');
const TodoModel = require('../models/Todo.js');
const router = new Router();

router.get('/api/todos', function * () {
    const uid = this.cookies.get('uid');
    this.body = yield TodoModel.find({ uid: uid });
});

router.post('/api/todos', function * () {
    yield TodoModel.create(Object.assign({}, this.request.body, {
        uid: this.cookies.get('uid')
    }));

    this.body = { message: 'ok' };
});

router.put('/api/todos/:id', function * () {
    const todo = yield TodoModel.findOne({ id: this.params.id });

    if (!todo) {
        this.throw(404, { error: 'Not found' });
    }

    if (todo.uid !== this.cookies.get('uid')) {
        this.throw(403, { error: 'Forbidden' });
    }

    for (let key in this.request.body) {
        todo[key] = this.request.body[key];
    }

    yield todo.save();

    this.body = { message: 'ok' };
});

router.delete('/api/todos/:id', function * () {
    const todo = yield TodoModel.findOne({ id: this.params.id });

    if (!todo) {
        this.throw(404, { error: 'Not found' });
    }

    if (todo.uid !== this.cookies.get('uid')) {
        this.throw(403, { error: 'Forbidden' });
    }

    yield todo.remove();

    this.body = { message: 'ok' };
});

module.exports = router;

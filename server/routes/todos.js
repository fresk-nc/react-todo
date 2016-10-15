'use strict';

const R = require('ramda');
const Router = require('koa-router');
const TodoModel = require('models/Todo.js');

const router = new Router({
    prefix: '/api/todos'
});

router.param('id', function * (id, next) {
    this.todoById = yield TodoModel.findOne({ id });

    if (!this.todoById) {
        this.throw(404);
    }

    if (this.todoById.uid !== this.cookies.get('uid')) {
        this.throw(403);
    }

    yield* next;
});

router.get('/', function * () {
    const uid = this.cookies.get('uid');
    const todos = yield TodoModel.find({ uid: uid }).sort({ sequence: 1 });

    this.body = R.map(TodoModel.getPublicFields, todos);
});

router.post('/', function * () {
    yield TodoModel.create(Object.assign({}, TodoModel.getPublicFields(this.request.body), {
        uid: this.cookies.get('uid')
    }));

    this.body = { message: 'ok' };
});

router.put('/:id', function * () {
    Object.assign(this.todoById, TodoModel.getMutableFields(this.request.body));

    yield this.todoById.save();
    this.body = { message: 'ok' };
});

router.delete('/:id', function * () {
    yield this.todoById.remove();
    this.body = { message: 'ok' };
});

module.exports = router;

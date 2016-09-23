'use strict';

const express = require('express');
const router = express.Router();

const TodoModel = require('./models/Todo.js');

router.get('/api/todos', (req, res, next) => {
    const uid = req.cookies.uid;

    TodoModel
        .find({ uid: uid })
        .then((todos) => {
            res.send(todos);
        })
        .catch((err) => {
            next(err, req, res);
        });
});

router.post('/api/todos', (req, res, next) => {
    TodoModel
        .create({
            id: req.body.id,
            uid: req.cookies.uid,
            text: req.body.text,
            completed: req.body.completed
        })
        .then(() => res.send({ message: 'ok' }))
        .catch((err) => {
            next(err, req, res);
        });
});

router.put('/api/todos/:id', (req, res, next) => {
    const uid = req.cookies.uid;

    TodoModel
        .findOne({ id: req.params.id })
        .then((todo) => {
            if (!todo) {
                res.status(404);
                return res.send({ error: 'Not found' });
            }

            if (todo.uid !== uid) {
                res.status(403);
                return res.send({ error: 'Forbidden' });
            }

            if (req.body.text !== undefined) {
                todo.text = req.body.text;
            }

            if (req.body.completed !== undefined) {
                todo.completed = req.body.completed;
            }

            return todo.save();
        })
        .then(() => res.send({ message: 'ok' }))
        .catch((err) => {
            next(err, req, res);
        });
});

router.delete('/api/todos/:id', (req, res, next) => {
    const uid = req.cookies.uid;

    TodoModel
        .findOne({ id: req.params.id })
        .then((todo) => {
            if (!todo) {
                res.status(404);
                return res.send({ error: 'Not found' });
            }

            if (todo.uid !== uid) {
                res.status(403);
                return res.send({ error: 'Forbidden' });
            }

            return todo.remove();
        })
        .then(() => res.send({ message: 'ok' }))
        .catch((err) => {
            next(err, req, res);
        });
});

module.exports = router;

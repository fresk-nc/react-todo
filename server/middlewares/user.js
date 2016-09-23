const uuid = require('node-uuid');

module.exports = function * (next) {
    if (!this.cookies.get('uid')) {
        this.cookies.set('uid', uuid.v1());
    }

    yield* next;
};

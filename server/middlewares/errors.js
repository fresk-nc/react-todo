/* eslint-disable no-console */

module.exports = function * (next) {
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
};

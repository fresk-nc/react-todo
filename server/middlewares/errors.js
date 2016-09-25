/* eslint-disable no-console */

module.exports = function * (next) {
    try {
        yield* next;
    } catch (e) {
        if (e.status) {
            this.body = { error: e.message };
            this.status = e.status;
        } else {
            this.body = 'Server Error';
            this.status = 500;
            console.error(e.message, e.stack);
        }
    }
};

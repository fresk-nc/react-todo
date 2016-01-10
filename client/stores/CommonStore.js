import { EventEmitter } from 'events';

const EVENT_CHANGE = 'change';

export default class CommonStore extends EventEmitter {
    constructor(dispatcher) {
        super();
        dispatcher.register((action) => {
            this._onDispatch(action);
        });
    }

    emitChange() {
        this.emit(EVENT_CHANGE);
    }

    addChangeListener(callback) {
        this.on(EVENT_CHANGE, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(EVENT_CHANGE, callback);
    }

    _onDispatch() {}
}

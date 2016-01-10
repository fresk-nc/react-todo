import CommonStore from 'stores/CommonStore';
import AppDispatcher from 'dispatcher/AppDispatcher';

var state = [
    {
        id: 1,
        title: 'buy eggs',
        complete: false
    },
    {
        id: 2,
        title: 'buy eggs again',
        complete: false
    }
];

class TodoStore extends CommonStore {
    getAll() {
        return state;
    }

    _onDispatch() {
       // TODO
    }
}

export default new TodoStore(AppDispatcher);

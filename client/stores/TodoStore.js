import CommonStore from 'stores/CommonStore';
import AppDispatcher from 'dispatcher/AppDispatcher';
import TodoConstants from 'constants/TodoConstants';

var state = {
    '1': {
        id: 1,
        title: 'buy eggs',
        complete: false
    },
    '2': {
        id: 2,
        title: 'buy milk',
        complete: false
    },
    '3': {
        id: 3,
        title: 'buy bread',
        complete: true
    }
};

class TodoStore extends CommonStore {
    getAll() {
        return state;
    }

    update(id, data) {
        state[id] = Object.assign({}, state[id], data);
    }

    _onDispatch(action) {
        var { data, type } = action;

        switch (type) {

            case TodoConstants.TODO_COMPLETE:
                this.update(data.id, { complete: true });
                this.emitChange();
                break;

            case TodoConstants.TODO_UNDO_COMPLETE:
                this.update(data.id, { complete: false });
                this.emitChange();
                break;

        }
    }
}

export default new TodoStore(AppDispatcher);

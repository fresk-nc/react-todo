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

    updateItem(id, data) {
        state[id] = Object.assign({}, state[id], data);
    }

    deleteItem(id) {
        delete state[id];
    }

    _onDispatch(action) {
        var { data, type } = action;

        switch (type) {

            case TodoConstants.TODO_COMPLETE:
                this.updateItem(data.id, { complete: true });
                this.emitChange();
                break;

            case TodoConstants.TODO_UNDO_COMPLETE:
                this.updateItem(data.id, { complete: false });
                this.emitChange();
                break;

            case TodoConstants.TODO_DELETE:
                this.deleteItem(data.id);
                this.emitChange();
                break;

            case TodoConstants.TODO_UPDATE_TITLE:
                this.updateItem(data.id, { title: data.title });
                this.emitChange();
                break;

        }
    }
}

export default new TodoStore(AppDispatcher);

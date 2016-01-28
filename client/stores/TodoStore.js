import CommonStore from 'stores/CommonStore';
import AppDispatcher from 'dispatcher/AppDispatcher';
import TodoConstants from 'constants/TodoConstants';

let state = {};

class TodoStore extends CommonStore {

    getAll() {
        return state;
    }

    fillState(data) {
        state = data;
    }

    createItem() {
        let id = this._generateId();

        state[id] = {
            id: id,
            title: '',
            complete: false,
            isNew: true
        };
    }

    updateItem(id, data) {
        state[id] = Object.assign({}, state[id], data);
    }

    deleteItem(id) {
        delete state[id];
    }

    _generateId() {
        return Date.now();
    }

    _onDispatch(action) {
        let { data, type } = action;

        switch (type) {
            case TodoConstants.TODO_CREATE:
                this.createItem();
                this.emitChange();
                break;

            case TodoConstants.TODO_ITEMS_RECEIVED:
                this.fillState(data);
                this.emitChange();
                break;

            case TodoConstants.TODO_UPDATE:
                this.updateItem(data.id, data.newData);
                this.emitChange();
                break;

            case TodoConstants.TODO_DELETE:
                this.deleteItem(data.id);
                this.emitChange();
                break;
        }
    }

}

export default new TodoStore(AppDispatcher);

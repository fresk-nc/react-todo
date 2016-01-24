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

    createItem(data) {
        let id = this._generateId();

        state[id] = {
            id: id,
            title: data.title,
            complete: data.complete
        };
    }

    updateItem(id, data) {
        state[id] = Object.assign({}, state[id], data);
    }

    deleteItem(id) {
        delete state[id];
    }

    _generateId() {
        return Math.random().toString(36).slice(2, 9);
    }

    _onDispatch(action) {
        let { data, type } = action;

        switch (type) {

            case TodoConstants.TODO_COMPLETE:
                this.updateItem(data.id, { complete: true });
                this.emitChange();
                break;

            case TodoConstants.TODO_UNDO_COMPLETE:
                this.updateItem(data.id, { complete: false });
                this.emitChange();
                break;

            case TodoConstants.TODO_CREATE:
                this.createItem(data);
                this.emitChange();
                break;

            case TodoConstants.TODO_DELETE:
                this.deleteItem(data.id);
                this.emitChange();
                break;

            case TodoConstants.TODO_ITEMS_RECEIVED:
                this.fillState(data);
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

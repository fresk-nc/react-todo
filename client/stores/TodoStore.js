import CommonStore from 'stores/CommonStore';
import AppDispatcher from 'dispatcher/AppDispatcher';
import TodoConstants from 'constants/TodoConstants';
import Immutable from 'immutable';

let state = Immutable.OrderedMap();

class TodoStore extends CommonStore {

    getItems() {
        return state;
    }

    fillState(data) {
        state = state.merge(Immutable.fromJS(data));
    }

    createItem() {
        let id = this._generateId();
        let data = {
            id: id,
            title: '',
            isCompleted: false,
            isNew: true
        };

        state = state.set(id, Immutable.fromJS(data));
    }

    updateItem(id, data) {
        state = state.update(id, (todo) => {
            return todo.merge(Immutable.fromJS(data));
        });
    }

    deleteItem(id) {
        state = state.delete(id);
    }

    _generateId() {
        return String(Date.now());
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

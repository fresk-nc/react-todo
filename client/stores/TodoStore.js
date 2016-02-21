import CommonStore from 'stores/CommonStore';
import AppDispatcher from 'dispatcher/AppDispatcher';
import TodoConstants from 'constants/TodoConstants';
import Immutable from 'immutable';

class TodoStore extends CommonStore {

    getItems() {
        return this._state;
    }

    _fillState(data) {
        this._state = this._state.merge(Immutable.fromJS(data));
    }

    _createItem() {
        let id = this._generateId();
        let data = {
            id: id,
            title: '',
            isCompleted: false,
            isNew: true
        };

        this._state = this._state.set(id, Immutable.fromJS(data));
    }

    _updateItem(id, data) {
        this._state = this._state.update(id, (todo) => {
            return todo.merge(Immutable.fromJS(data));
        });
    }

    _deleteItem(id) {
        this._state = this._state.delete(id);
    }

    _generateId() {
        return String(Date.now());
    }

    _resetState() {
        this._state = Immutable.OrderedMap();
    }

    _onDispatch(action) {
        let { data, type } = action;

        switch (type) {
            case TodoConstants.TODO_CREATE:
                this._createItem();
                this.emitChange();
                break;

            case TodoConstants.TODO_ITEMS_RECEIVED:
                this._fillState(data);
                this.emitChange();
                break;

            case TodoConstants.TODO_UPDATE:
                this._updateItem(data.id, data.newData);
                this.emitChange();
                break;

            case TodoConstants.TODO_DELETE:
                this._deleteItem(data.id);
                this.emitChange();
                break;
        }
    }

}

export default new TodoStore(AppDispatcher);

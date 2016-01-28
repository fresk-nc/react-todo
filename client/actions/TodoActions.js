import AppDispatcher from'dispatcher/AppDispatcher';
import TodoConstants from 'constants/TodoConstants';
import ServiceApi from 'services/ServiceApi';

export default {
    createItem,
    readItems,
    updateItem,
    deleteItem
};

function createItem() {
    AppDispatcher.dispatch({
        type: TodoConstants.TODO_CREATE
    });
}

function readItems() {
    ServiceApi.getItems().then((data) => {
        AppDispatcher.dispatch({
            type: TodoConstants.TODO_ITEMS_RECEIVED,
            data: data
        });
    });
}

function updateItem(todoItem, data) {
    AppDispatcher.dispatch({
        type: TodoConstants.TODO_UPDATE,
        data: {
            id: todoItem.id,
            newData: data
        }
    });
}

function deleteItem(todoItem) {
    AppDispatcher.dispatch({
        type: TodoConstants.TODO_DELETE,
        data: {
            id: todoItem.id
        }
    });
}

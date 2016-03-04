import AppDispatcher from 'dispatcher/AppDispatcher';
import TodoConstants from 'constants/TodoConstants';
import ServiceApi from 'services/ServiceApi';

export default {
    createItem,
    readItems,
    updateItem,
    deleteItem,
    deleteItemFromList,
    undoDeleteItem
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

function updateItem(id, data) {
    ServiceApi.updateItem(id, data);

    AppDispatcher.dispatch({
        type: TodoConstants.TODO_UPDATE,
        data: {
            id: id,
            newData: data
        }
    });
}

function deleteItem(id) {
    ServiceApi.deleteItem(id);
}

function undoDeleteItem(id) {
    ServiceApi.undoDeleteItem(id);
}

function deleteItemFromList(id) {
    AppDispatcher.dispatch({
        type: TodoConstants.TODO_DELETE,
        data: {
            id: id
        }
    });
}

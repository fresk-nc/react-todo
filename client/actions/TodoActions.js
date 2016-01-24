import AppDispatcher from'dispatcher/AppDispatcher';
import TodoConstants from 'constants/TodoConstants';
import ServiceApi from 'services/ServiceApi';

export default {
    createItem,
    deleteItem,
    requestItems,
    toggleComplete,
    updateTitle
};

function createItem(data) {
    AppDispatcher.dispatch({
        type: TodoConstants.TODO_CREATE,
        data: data
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

function requestItems() {
    ServiceApi.getItems().then((data) => {
        AppDispatcher.dispatch({
            type: TodoConstants.TODO_ITEMS_RECEIVED,
            data: data
        });
    });
}

function toggleComplete(todoItem) {
    var id = todoItem.id;
    var actionType;

    if (todoItem.complete) {
        actionType = TodoConstants.TODO_UNDO_COMPLETE;
    } else {
        actionType = TodoConstants.TODO_COMPLETE;
    }

    AppDispatcher.dispatch({
        type: actionType,
        data: {
            id: id
        }
    });
}

function updateTitle(todoItem, title) {
    AppDispatcher.dispatch({
        type: TodoConstants.TODO_UPDATE_TITLE,
        data: {
            id: todoItem.id,
            title: title
        }
    });
}

import AppDispatcher from'dispatcher/AppDispatcher';
import TodoConstants from 'constants/TodoConstants';

export default {
    deleteItem,
    toggleComplete
};

function deleteItem(todoItem) {
    AppDispatcher.dispatch({
        type: TodoConstants.TODO_DELETE,
        data: {
            id: todoItem.id
        }
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

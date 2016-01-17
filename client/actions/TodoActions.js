import AppDispatcher from'dispatcher/AppDispatcher';
import TodoConstants from 'constants/TodoConstants';

export default {
    toggleComplete
};

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

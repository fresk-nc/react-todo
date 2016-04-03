import { List, Map } from 'immutable';
import types from 'constants/ActionTypes';

export default function status(state = List(), action) {
    switch (action.type) {

        case types.DELETE_NOTIFICATION:
            return state.shift();

        case types.DELETE_TODO_FAILURE:
            return state.push(Map({
                type: 'notification.deleteFail'
            }));

        case types.CREATE_TODO_FAILURE:
            return state.push(Map({
                type: 'notification.createFail'
            }));

        case types.EDIT_TODO_FAILURE:
        case types.COMPLETE_TODO_FAILURE:
            return state.push(Map({
                type: 'notification.editFail'
            }));

        default:
            return state;
    }
}

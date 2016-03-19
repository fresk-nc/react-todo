import { List, Map } from 'immutable';
import types from 'constants/ActionTypes';

export default function status(state = List(), action) {
    switch (action.type) {

        case types.DELETE_NOTIFICATION:
            return state.shift();

        case types.DELETE_TODO_FAILURE:
            return state.push(Map({
                message: 'Todo isn\'t removed'
            }));

        case types.CREATE_TODO_FAILURE:
            return state.push(Map({
                message: 'Todo isn\'t created'
            }));

        case types.EDIT_TODO_FAILURE:
        case types.COMPLETE_TODO_FAILURE:
            return state.push(Map({
                message: 'Todo isn\'t edited'
            }));

        default:
            return state;
    }
}

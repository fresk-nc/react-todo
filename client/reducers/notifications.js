import { List, Map } from 'immutable';
import createReducer from 'utils/createReducer';
import types from 'constants/ActionTypes';

export default createReducer(new List(), {
    [types.DELETE_NOTIFICATION](state) {
        return state.shift();
    },

    [types.DELETE_TODO_FAILURE](state) {
        return state.push(new Map({
            type: 'notification.deleteFail'
        }));
    },

    [types.CREATE_TODO_FAILURE](state) {
        return state.push(new Map({
            type: 'notification.createFail'
        }));
    },

    [types.EDIT_TODO_FAILURE](state) {
        return state.push(new Map({
            type: 'notification.editFail'
        }));
    },

    [types.COMPLETE_TODO_FAILURE](state) {
        return state.push(new Map({
            type: 'notification.editFail'
        }));
    }
});

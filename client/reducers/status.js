import { Map } from 'immutable';
import createReducer from 'utils/createReducer';
import types from 'constants/ActionTypes';

const initialState = new Map({
    request: false,
    error: null
});

export default createReducer(initialState, {
    [types.GET_TODOS](state) {
        return state.merge(new Map({
            request: true,
            error: null
        }));
    },

    [types.GET_TODOS_SUCCESS](state) {
        return state.set('request', false);
    },

    [types.GET_TODOS_FAILURE](state, action) {
        return state.merge(new Map({
            request: false,
            error: action.error
        }));
    }
});

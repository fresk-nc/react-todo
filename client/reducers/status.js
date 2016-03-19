import { Map } from 'immutable';
import types from 'constants/ActionTypes';

const initialState = Map({
    request: false,
    error: null
});

export default function status(state = initialState, action) {
    switch (action.type) {

        case types.GET_TODOS:
            return state.merge(Map({
                request: true,
                error: null
            }));

        case types.GET_TODOS_SUCCESS:
            return state.set('request', false);

        case types.GET_TODOS_FAILURE:
            return state.merge(Map({
                request: false,
                error: action.error
            }));

        default:
            return state;
    }
}

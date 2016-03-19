import { List, Map, fromJS } from 'immutable';
import types from 'constants/ActionTypes';

export default function todos(state = List(), action) {
    switch (action.type) {

        case types.GET_TODOS_SUCCESS:
            return state.merge(fromJS(action.response));

        case types.ADD_TODO:
            return state.push(Map({
                id: action.id,
                text: '',
                completed: false,
                new: true
            }));

        case types.CREATE_TODO:
            return state.map((todo) => {
                if (todo.get('id') !== action.id) {
                    return todo;
                }

                return todo.merge(Map({
                    text: action.text,
                    new: false
                }));
            });

        case types.EDIT_TODO:
            return state.map((todo) => {
                if (todo.get('id') !== action.id) {
                    return todo;
                }

                return todo.set('text', action.text);
            });

        case types.DELETE_TODO:
            return state.filter((todo) => todo.get('id') !== action.id);

        case types.COMPLETE_TODO:
            return state.map((todo) => {
                if (todo.get('id') !== action.id) {
                    return todo;
                }

                return todo.update('completed', v => !v);
            });

        default:
            return state;
    }
}

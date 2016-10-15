import { Map, OrderedMap } from 'immutable';
import TodoRecord from 'records/TodoRecord';
import createReducers from 'utils/createReducer';
import types from 'constants/ActionTypes';

export default createReducers(new OrderedMap(), {
    [types.GET_TODOS_SUCCESS](state, action) {
        return action.response.reduce((todos, todo) => {
            return todos.set(todo.id, new TodoRecord(todo));
        }, new OrderedMap());
    },

    [types.ADD_TODO](state, action) {
        const lastTodo = state.last();

        return state.set(action.id, new TodoRecord({
            id: action.id,
            new: true,
            sequence: lastTodo ? lastTodo.sequence + 1 : 1
        }));
    },

    [types.CREATE_TODO](state, action) {
        return state.mergeIn([ action.id ], Map({
            text: action.text,
            new: false
        }));
    },

    [types.EDIT_TODO](state, action) {
        return state.setIn([ action.id, 'text' ], action.text);
    },

    [types.DELETE_TODO](state, action) {
        return state.delete(action.id);
    },

    [types.COMPLETE_TODO](state, action) {
        return state.updateIn([ action.id, 'completed' ], v => !v);
    }
});

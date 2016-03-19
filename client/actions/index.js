import { CALL_API } from 'middleware/api';
import types from 'constants/ActionTypes';

export function getTodos() {
    return {
        [CALL_API]: {
            endpoint: 'api/todos',
            method: 'GET',
            types: [ types.GET_TODOS, types.GET_TODOS_SUCCESS, types.GET_TODOS_FAILURE ]
        }
    };
}

export function createLocalTodo() {
    return { type: types.ADD_TODO, id: Date.now() };
}

export function createTodo(id, text) {
    return {
        id,
        text,
        [CALL_API]: {
            endpoint: 'api/todos',
            method: 'POST',
            body: { id, text },
            types: [ types.CREATE_TODO, types.CREATE_TODO_SUCCESS, types.CREATE_TODO_FAILURE ],
            meta: { optimist: true }
        }
    };
}

export function editTodo(id, text) {
    return {
        id,
        text,
        [CALL_API]: {
            endpoint: `api/todos/${id}`,
            method: 'PUT',
            body: { text },
            types: [ types.EDIT_TODO, types.EDIT_TODO_SUCCESS, types.EDIT_TODO_SUCCESS ],
            meta: { optimist: true }
        }
    };
}

export function completeTodo(id, complete) {
    return {
        id,
        [CALL_API]: {
            endpoint: `api/todos/${id}`,
            method: 'PUT',
            types: [ types.COMPLETE_TODO, types.COMPLETE_TODO_SUCCESS, types.COMPLETE_TODO_FAILURE ],
            body: { completed: !complete },
            meta: { optimist: true }
        }
    };
}

export function deleteLocalTodo(id) {
    return { type: types.DELETE_TODO, id };
}

export function deleteTodo(id) {
    return {
        id,
        [CALL_API]: {
            endpoint: `api/todos/${id}`,
            method: 'DELETE',
            types: [ types.DELETE_TODO, types.DELETE_TODO_SUCCESS, types.DELETE_TODO_FAILURE ],
            meta: { optimist: true }
        }
    };
}

export function deleteNotification() {
    return { type: types.DELETE_NOTIFICATION };
}

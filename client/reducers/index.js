import optimist from 'redux-optimist';
import { combineReducers } from 'redux';
import todos from './todos';
import status from './status';
import notifications from './notifications';

export default optimist(combineReducers({
    todos,
    status,
    notifications
}));

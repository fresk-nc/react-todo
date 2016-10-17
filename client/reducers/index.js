import optimist from 'redux-optimist';
import { combineReducers } from 'redux';
import { intlReducer } from 'react-intl-redux';
import todos from './todos';
import status from './status';
import notifications from './notifications';

export default optimist(combineReducers({
    intl: intlReducer,
    todos,
    status,
    notifications
}));

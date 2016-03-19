import { createStore, applyMiddleware } from 'redux';
import api from 'middleware/api';
import createLogger from 'redux-logger';
import rootReducer from 'reducers';

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            api,
            createLogger()
        )
    );
}

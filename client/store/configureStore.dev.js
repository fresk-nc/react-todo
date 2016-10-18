import { createStore, applyMiddleware } from 'redux';
import api from 'middleware/api';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';
import { Iterable } from 'immutable';

function stateTransformer(state) {
    return Object.keys(state).reduce((newState, key) => {
        const value = state[key];

        newState[key] = Iterable.isIterable(value) ? value.toJS() : value;

        return newState;
    }, {});
}

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            thunk,
            api,
            createLogger({ stateTransformer })
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}

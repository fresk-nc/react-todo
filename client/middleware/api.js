import { BEGIN, COMMIT, REVERT } from 'redux-optimist';

let nextTransactionID = 0;

export const CALL_API = Symbol('Call API');

export default () => next => action => {
    const callAPI = action[CALL_API];

    if (typeof callAPI === 'undefined') {
        return next(action);
    }

    let transactionID;
    const { endpoint, method, types, meta, body } = callAPI;
    const [ requestType, successType, failureType ] = types;
    const isOptimist = (meta && meta.optimist);

    if (isOptimist) {
        transactionID = nextTransactionID++;
    }

    function actionWith(data) {
        const finalAction = Object.assign({}, action, data);
        delete finalAction[CALL_API];
        return finalAction;
    }

    next(actionWith({
        type: requestType,
        optimist: isOptimist ? { type: BEGIN, id: transactionID } : false
    }));

    request(endpoint, method, body)
        .then((response) => {
            next(actionWith({
                type: successType,
                response,
                optimist: isOptimist ? { type: COMMIT, id: transactionID } : false
            }));
        }).catch((err) => {
            next(actionWith({
                type: failureType,
                error: err,
                optimist: isOptimist ? { type: REVERT, id: transactionID } : false
            }));
        });
};

function request(endpoint, method, body) {
    const requestParams = {
        method,
        credentials: 'same-origin'
    };

    if (body) {
        requestParams.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        };
        requestParams.body = JSON.stringify(body);
    }

    return fetch(endpoint, requestParams)
        .then(checkStatus)
        .then((response) => response.json());
}

function checkStatus(response) {
    if (response.status >= 200 &&
        response.status < 300
    ) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

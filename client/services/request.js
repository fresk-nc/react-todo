export default function(method, params) {
    params = params || {};

    return new Promise((resolve, reject) => {
        let requestParams = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                method,
                params
            })
        };

        fetch('./api', requestParams)
            .then(checkStatus)
            .then(parseJSON)
            .then(resolve)
            .catch(reject);
    });
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

function parseJSON(response) {
    return response.json();
}

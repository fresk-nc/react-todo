import request from './request';

export default {
    getItems
};

function getItems() {
    return request('items');
}

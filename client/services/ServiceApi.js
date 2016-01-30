import request from './request';

function getItems() {
    return request('items');
}

function updateItem(id, data) {
    return request('update', {
        id,
        data
    });
}

function deleteItem(id) {
    return request('delete', {
        id: id
    });
}

export default {
    getItems,
    updateItem,
    deleteItem
};

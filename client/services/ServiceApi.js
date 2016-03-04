import request from './request';

export default {
    getItems,
    updateItem,
    deleteItem,
    undoDeleteItem
};

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

function undoDeleteItem(id) {
    return request('undo_delete', {
        id: id
    });
}

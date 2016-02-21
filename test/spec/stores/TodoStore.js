import TodoStore from 'stores/TodoStore';
import AppDispatcher from 'dispatcher/AppDispatcher';
import TodoConstants from 'constants/TodoConstants';
import Immutable from 'immutable';

describe('TodoStore', () => {

    beforeEach(function() {
        this.sinon.stub(TodoStore, '_generateId');

        TodoStore._resetState();
    });

    it('should initialize with no items', function() {
        expect(TodoStore.getItems()).to.be.equal(Immutable.OrderedMap());
    });

    it('should be able to create new item', function() {
        const id = '111';

        TodoStore._generateId.returns(id);

        AppDispatcher.dispatch({
            type: TodoConstants.TODO_CREATE
        });

        expect(TodoStore.getItems().size).to.be.equal(1);
        expect(TodoStore.getItems().get(id)).to.be.deep.equal(Immutable.Map({
            id: id,
            title: '',
            isCompleted: false,
            isNew: true
        }));
    });

    it('should be able to remove item', function() {
        const id = '111';

        TodoStore._generateId.returns(id);

        AppDispatcher.dispatch({
            type: TodoConstants.TODO_CREATE
        });

        expect(TodoStore.getItems().size).to.be.equal(1);

        AppDispatcher.dispatch({
            type: TodoConstants.TODO_DELETE,
            data: {
                id
            }
        });

        expect(TodoStore.getItems().size).to.be.equal(0);
    });

    it('should be able to update item', function() {
        const id = '111';
        const title = 'buy eggs';

        TodoStore._generateId.returns(id);

        AppDispatcher.dispatch({
            type: TodoConstants.TODO_CREATE
        });
        AppDispatcher.dispatch({
            type: TodoConstants.TODO_UPDATE,
            data: {
                id,
                newData: {
                    title
                }
            }
        });

        expect(TodoStore.getItems().get('111').get('title')).to.be.equal(title);
    });

    it('should be able to save items received from server', function() {
        const data = {
            '1': {
                id: '1',
                title: 'buy milk',
                isCompleted: true,
                isNew: false
            }
        };

        AppDispatcher.dispatch({
            type: TodoConstants.TODO_ITEMS_RECEIVED,
            data
        });

        expect(TodoStore.getItems().get('1')).to.be.deep.equal(Immutable.Map(data['1']));
    });

});

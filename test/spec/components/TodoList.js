import TodoList from 'components/TodoList';
import TodoItem from 'components/TodoItem';
import TodoRecord from 'records/TodoRecord';
import { OrderedMap } from 'immutable';
import { shallow } from 'enzyme';

function setup(props) {
    const actions = {
        createTodo: sinon.spy(),
        completeTodo: sinon.spy(),
        deleteLocalTodo: sinon.spy(),
        deleteTodo: sinon.spy(),
        editTodo: sinon.spy()
    };

    const component = shallow(
        <TodoList todos={props.todos} actions={actions} />
    );

    return {
        actions,
        component
    };
}

describe('TodoList component', () => {

    it('should render the entire list of todos', () => {
        const todos = OrderedMap({
            '1': new TodoRecord({
                id: '1',
                text: 'buy milk',
                completed: false,
                sequence: 1
            }),
            '2': new TodoRecord({
                id: '2',
                text: 'buy bread',
                completed: true,
                sequence: 2
            })
        });
        const { component } = setup({ todos });

        expect(component.find(TodoItem)).to.have.length(todos.size);
    });

});

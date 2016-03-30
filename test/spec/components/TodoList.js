import TodoList from 'components/TodoList';
import TodoItem from 'components/TodoItem';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';

function setup(props) {
    const component = shallow(
        <TodoList todos={props.todos} actions={props.actions} />
    );

    return {
        component
    };
}

function mockActions() {
    return {
        completeTodo: () => {},
        createTodo: () => {},
        deleteLocalTodo: () => {},
        deleteTodo: () => {},
        editTodo: () => {}
    };
}

describe('TodoList component', () => {

    it('should render the entire list of todos', () => {
        const todos = fromJS([
            {
                id: 1,
                text: 'buy milk',
                completed: false
            },
            {
                id: 2,
                text: 'buy bread',
                completed: true
            }
        ]);
        const { component } = setup({
            todos,
            actions: mockActions()
        });

        expect(component.find(TodoItem)).to.have.length(todos.size);
    });

});

import TodoItem from 'components/TodoItem';
import TodoRecord from 'records/TodoRecord';
import styles from 'components/TodoItem/TodoItem.styl';
import { ENTER, ESCAPE } from 'constants/KeyboardCodes';
import { shallow } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { messages } from 'loc/en';

const locale = 'en';
const intlProvider = new IntlProvider({
    locale,
    messages
}, {});

function setup(props) {
    const actions = {
        createTodo: sinon.spy(),
        completeTodo: sinon.spy(),
        deleteLocalTodo: sinon.spy(),
        deleteTodo: sinon.spy(),
        editTodo: sinon.spy()
    };
    const { intl } = intlProvider.getChildContext();

    const component = shallow(
        <TodoItem.WrappedComponent todo={props.todo} {...actions} intl={intl} />
    );

    return {
        actions,
        component,
        content: component.find(`.${styles.content}`),
        text: component.find(`.${styles.text}`),
        toggler: component.find(`.${styles.toggler}`),
        deleteButton: component.find(`.${styles.delete}`),
        editField: component.find(`.${styles.editField}`)
    };
}

function mockTodo(overrides) {
    return new TodoRecord(Object.assign({}, {
        id: '1',
        text: 'buy milk'
    }, overrides));
}

describe('TodoItem component', () => {
    beforeEach(function() {
        this.sinon.stub(TodoItem.WrappedComponent.prototype, 'componentDidUpdate');
    });

    it('should render the text', () => {
        const todo = mockTodo();
        const { text } = setup({ todo });

        expect(text.text()).to.be.equal(todo.text);
    });

    it('should render the unchecked toggler when not completed', () => {
        const todo = mockTodo();
        const { toggler } = setup({ todo });

        expect(toggler.prop('checked')).to.be.equal(false);
    });

    it('should render the checked toggler when completed', () => {
        const todo = mockTodo({ completed: true });
        const { toggler } = setup({ todo });

        expect(toggler.prop('checked')).to.be.equal(true);
    });

    it('should call completeTodo handler with the right arguments by clicking on the toggler', () => {
        const todo = mockTodo();
        const { toggler, actions } = setup({ todo });

        toggler.simulate('change');
        expect(actions.completeTodo).to.have.callCount(1);
        expect(actions.completeTodo).to.be.calledWith(todo.id, todo.completed);
    });

    it('should render the delete button', () => {
        const todo = mockTodo();
        const { deleteButton } = setup({ todo });

        expect(deleteButton).to.have.length(1);
    });

    it('should call deleteTodo handler with the right arguments by clicking on the delete button', () => {
        const todo = mockTodo();
        const { deleteButton, actions } = setup({ todo });

        deleteButton.simulate('click');
        expect(actions.deleteTodo).to.have.callCount(1);
        expect(actions.deleteTodo).to.be.calledWith(todo.id);
    });

    it('should hide all controls and display the input field by clicking on the content', () => {
        const todo = mockTodo();
        const {
            component,
            content,
            text,
            toggler,
            deleteButton,
            editField
        } = setup({ todo });

        expect(editField).to.have.length(0);
        expect(content).to.have.length(1);
        expect(text).to.have.length(1);
        expect(toggler).to.have.length(1);
        expect(deleteButton).to.have.length(1);

        content.simulate('click');

        expect(component.find(`.${styles.editField}`)).to.have.length(1);
        expect(component.find(`${styles.content}`)).to.have.length(0);
        expect(component.find(`${styles.text}`)).to.have.length(0);
        expect(component.find(`${styles.toggler}`)).to.have.length(0);
        expect(component.find(`${styles.delete}`)).to.have.length(0);
    });

    it('should render only the input field if the todo is new', () => {
        const todo = mockTodo({ new: true });
        const {
            content,
            text,
            toggler,
            deleteButton,
            editField
        } = setup({ todo });

        expect(editField).to.have.length(1);
        expect(content).to.have.length(0);
        expect(text).to.have.length(0);
        expect(toggler).to.have.length(0);
        expect(deleteButton).to.have.length(0);
    });

    it('should call deleteLocalTodo handler with the right arguments by pressing Escape if the todo is new', () => {
        const todo = mockTodo({ new: true });
        const { editField, actions } = setup({ todo });

        editField.simulate('keydown', { which: ESCAPE });

        expect(actions.deleteLocalTodo).to.have.callCount(1);
        expect(actions.deleteLocalTodo).to.be.calledWith(todo.id);
    });

    it('should exit the edit mode by pressing Escape if the todo is not new', () => {
        const todo = mockTodo();
        const { component } = setup({ todo });

        component.setState({ editing: true });
        component.find(`.${styles.editField}`).simulate('keydown', { which: ESCAPE });

        expect(component.state('editing')).to.be.equal(false);
    });

    it('should call deleteLocalTodo handler with right arguments by pressing Enter if the todo is new and there is no text', () => {
        const todo = mockTodo({ new: true, text: '' });
        const { editField, actions } = setup({ todo });

        editField.simulate('keydown', { which: ENTER });

        expect(actions.deleteLocalTodo).to.have.callCount(1);
        expect(actions.deleteLocalTodo).to.be.calledWith(todo.id);
    });

    it('should call deleteTodo handler with right arguments by pressing Enter if the todo is not new and there is no text', () => {
        const todo = mockTodo();
        const { component, actions } = setup({ todo });

        component.setState({ editing: true, editText: '' });
        component.find(`.${styles.editField}`).simulate('keydown', { which: ENTER });

        expect(actions.deleteTodo).to.have.callCount(1);
        expect(actions.deleteTodo).to.be.calledWith(todo.id);
    });

    it('should call createTodo handler with right arguments by pressing Enter if the todo is new and there is text', () => {
        const todo = mockTodo({ new: true });
        const { component, editField, actions } = setup({ todo });
        const newTitle = 'buy bread';

        component.setState({ editText: newTitle });
        editField.simulate('keydown', { which: ENTER });

        expect(actions.createTodo).to.have.callCount(1);
        expect(actions.createTodo).to.be.calledWith(todo, newTitle);
    });

    it('should call editTodo handler with right arguments by pressing Enter if the todo is not new and there is text', () => {
        const todo = mockTodo();
        const { component, actions } = setup({ todo });
        const newTitle = 'buy bread';

        component.setState({ editing: true, editText: newTitle });
        component.find(`.${styles.editField}`).simulate('keydown', { which: ENTER });

        expect(actions.editTodo).to.have.callCount(1);
        expect(actions.editTodo).to.be.calledWith(todo.id, newTitle);
    });
});

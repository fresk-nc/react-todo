import MainSection from 'components/MainSection';
import TodoList from 'components/TodoList';
import styles from 'components/MainSection/MainSection.styl';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';

function setup(props) {
    const actions = {
        createTodo: sinon.spy(),
        completeTodo: sinon.spy(),
        deleteLocalTodo: sinon.spy(),
        deleteTodo: sinon.spy(),
        editTodo: sinon.spy()
    };
    const todos = fromJS([]);

    const component = shallow(
        <MainSection todos={todos} actions={actions} status={props.status} />
    );

    return {
        actions,
        todos,
        component,
        createButton: component.find(`.${styles.createButton}`),
        spinner: component.find(`.${styles.spinner}`),
        loadError: component.find(`.${styles.loadError}`),
        list: component.find(TodoList)
    };
}

describe('MainSection component', () => {

    it('should render the createButton if there is no error and request', () => {
        const status = fromJS({ request: false, error: null });
        const { createButton } = setup({ status });

        expect(createButton).to.have.length(1);
    });

    it('should not render the createButton if there is request', () => {
        const status = fromJS({ request: true, error: null });
        const { createButton } = setup({ status });

        expect(createButton).to.have.length(0);
    });

    it('should not render the createButton if there is error', () => {
        const status = fromJS({ request: false, error: 'error' });
        const { createButton } = setup({ status });

        expect(createButton).to.have.length(0);
    });

    it('should render the spinner during request', () => {
        const status = fromJS({ request: true, error: null });
        const { spinner } = setup({ status });

        expect(spinner).to.have.length(1);
    });

    it('should not render the spinner if there is no request', () => {
        const status = fromJS({ request: false, error: null });
        const { spinner } = setup({ status });

        expect(spinner).to.have.length(0);
    });

    it('should render the error if there is error', () => {
        const status = fromJS({ request: false, error: 'error' });
        const { loadError } = setup({ status });

        expect(loadError).to.have.length(1);
    });

    it('should not render the error if there is no error', () => {
        const status = fromJS({ request: false, error: null });
        const { loadError } = setup({ status });

        expect(loadError).to.have.length(0);
    });

    it('should render the list of todos', () => {
        const status = fromJS({ request: false, error: null });
        const { list } = setup({ status });

        expect(list).to.have.length(1);
    });

});

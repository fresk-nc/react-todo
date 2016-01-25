import TodoStore from 'stores/TodoStore';
import ComponentTodoList from 'components/TodoList';
import ComponentTodoCreate from 'components/TodoCreate';
import './index.styl';

export default React.createClass({

    displayName: 'MainSection',

    getInitialState: function() {
        return this._getTodoState();
    },

    componentDidMount: function() {
        TodoStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TodoStore.removeChangeListener(this._onChange);
    },

    render: function() {
        return (
            <div className="main-section">
                <ComponentTodoList items={this.state.items} />
                <ComponentTodoCreate />
            </div>
        );
    },

    _getTodoState: function() {
        return {
            items: TodoStore.getAll()
        };
    },

    _onChange: function() {
        this.setState(this._getTodoState());
    }

});

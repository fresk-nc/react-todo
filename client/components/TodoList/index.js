import TodoStore from 'stores/TodoStore';
import TodoActions from 'actions/TodoActions';
import ComponentTodoItem from 'components/TodoItem';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './index.styl';

let TodoList = React.createClass({

    displayName: 'TodoList',

    getInitialState: function() {
        return {
            items: null
        };
    },

    componentDidMount: function() {
        TodoActions.requestItems();
        TodoStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TodoStore.removeChangeListener(this._onChange);
    },

    render: function() {
        return (
            <div className="todo-list">
                {this._renderContent()}
            </div>
        );
    },

    _renderContent() {
        let items = this.state.items;
        let nodes = [];

        for (var key in items) {
            nodes.push(<ComponentTodoItem key={key} todo={items[key]} />);
        }

        if (items !== null && nodes.length === 0) {
            return (
                <div className="todo-list__empty">
                    Now is the good time to do something
                </div>
            );
        } else {
            return (
                <ReactCSSTransitionGroup
                    transitionName="todo-list"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}>
                    {nodes}
                </ReactCSSTransitionGroup>
            );
        }
    },

    _onChange: function() {
        this.setState(this._getTodoState());
    },

    _getTodoState: function() {
        return {
            items: TodoStore.getAll()
        };
    }

});

export default TodoList;

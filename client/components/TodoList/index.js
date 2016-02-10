import TodoStore from 'stores/TodoStore';
import TodoActions from 'actions/TodoActions';
import TodoItem from 'components/TodoItem';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './TodoList.styl';

let TodoList = React.createClass({

    displayName: 'TodoList',

    getInitialState: function() {
        return {
            items: null
        };
    },

    componentDidMount: function() {
        TodoActions.readItems();
        TodoStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TodoStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(this._getTodoState());
    },

    _getTodoState: function() {
        return {
            items: TodoStore.getAll()
        };
    },

    render: function() {
        let items = this.state.items;
        let nodes = [];

        for (var key in items) {
            nodes.push(<TodoItem key={key} todo={items[key]} />);
        }

        if (items !== null && nodes.length === 0) {
            return (
                <div className={styles.empty}>
                    Now is the good time to do something
                </div>
            );
        } else {
            return (
                <ReactCSSTransitionGroup
                    className={styles.wrap}
                    component="div"
                    transitionName="todo-list"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}>
                    {nodes}
                </ReactCSSTransitionGroup>
            );
        }
    }

});

export default TodoList;

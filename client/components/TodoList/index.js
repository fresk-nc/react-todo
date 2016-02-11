import TodoStore from 'stores/TodoStore';
import TodoActions from 'actions/TodoActions';
import TodoItem from 'components/TodoItem';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './TodoList.styl';

let TodoList = React.createClass({

    displayName: 'TodoList',

    getInitialState: function() {
        return this._getTodoState();
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
            items: TodoStore.getItems()
        };
    },

    render: function() {
        return (
            <ReactCSSTransitionGroup
                className={styles.wrap}
                component="div"
                transitionName="todo-list"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
                {this.state.items.valueSeq().map((item) => {
                    return (
                        <TodoItem
                            key={item.get('id')}
                            id={item.get('id')}
                            title={item.get('title')}
                            isCompleted={item.get('isCompleted')}
                            isNew={item.get('isNew')}
                        />
                    );
                })}
            </ReactCSSTransitionGroup>
        );
    }

});

export default TodoList;

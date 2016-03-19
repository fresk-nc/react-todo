import TodoItem from 'components/TodoItem';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './TodoList.styl';

class TodoList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { todos, actions } = this.props;

        return (
            <ReactCSSTransitionGroup
                className={styles.wrap}
                component="div"
                transitionName="todo-list"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
                {todos.map((todo) => {
                    return (
                        <TodoItem
                            key={todo.get('id')}
                            todo={todo.toObject()}
                            {...actions}
                        />
                    );
                })}
            </ReactCSSTransitionGroup>
        );
    }

}

TodoList.displayName = 'TodoList';

TodoList.propTypes = {
    actions: React.PropTypes.object.isRequired,
    todos: React.PropTypes.object.isRequired
};

export default TodoList;

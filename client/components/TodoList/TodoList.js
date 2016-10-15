import TodoItem from 'components/TodoItem';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './TodoList.styl';

export default class TodoList extends React.Component {

    static displayName = 'TodoList';

    static propTypes = {
        actions: React.PropTypes.object.isRequired,
        todos: React.PropTypes.object.isRequired
    };

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
                {todos.valueSeq().map((todo) => {
                    return (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            {...actions}
                        />
                    );
                })}
            </ReactCSSTransitionGroup>
        );
    }
}

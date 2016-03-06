import TodoStore from 'stores/TodoStore';
import TodoActions from 'actions/TodoActions';
import TodoItem from 'components/TodoItem';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './TodoList.styl';

class TodoList extends React.Component {

    constructor() {
        super();
        this.state = this._getTodoState();
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        TodoActions.readItems();
        TodoStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        TodoStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState(this._getTodoState());
    }

    _getTodoState() {
        return {
            items: TodoStore.getItems()
        };
    }

    render() {
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

}

TodoList.displayName = 'TodoList';

export default TodoList;

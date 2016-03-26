import { ENTER, ESCAPE } from 'constants/KeyboardCodes';
import classNames from 'classnames';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import styles from './TodoItem.styl';

export default class TodoItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            editText: props.todo.text
        };

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidUpdate() {
        if (this.state.editing || this.props.todo.new) {
            let valueLength = this._editField.value.length;
            this._editField.setSelectionRange(valueLength, valueLength);
            this._editField.focus();
        }
    }

    _handleTextChange(event) {
        this.setState({ editText: event.target.value });
    }

    _handleDoubleClick() {
        this.setState({ editing: true });
    }

    _handleKeyDown(event) {
        const { todo, deleteLocalTodo } = this.props;

        if (event.which === ESCAPE) {
            if (todo.new) {
                deleteLocalTodo(todo.id);
            } else {
                this.setState({
                    editing: false,
                    editText: todo.text
                });
            }
        } else if (event.which === ENTER) {
            this._save();
        }
    }

    _handleBlur() {
        this._save();
    }

    _save() {
        const newTitle = this.state.editText.trim();
        const { todo, createTodo, deleteTodo, deleteLocalTodo, editTodo } = this.props;

        if (!newTitle) {
            if (todo.new) {
                deleteLocalTodo(todo.id);
            } else {
                deleteTodo(todo.id);
            }
            return;
        }

        if (todo.new) {
            createTodo(todo.id, newTitle);
        } else {
            editTodo(todo.id, newTitle);
        }

        this.setState({
            editing: false,
            editText: newTitle
        });
    }

    _renderContent() {
        const { todo, deleteTodo, completeTodo } = this.props;

        if (this.state.editing || todo.new) {
            return (
                <div className={styles.editWrap}>
                    <input
                        ref={(c) => this._editField = c}
                        className={styles.editField}
                        value={this.state.editText}
                        onChange={this._handleTextChange.bind(this)}
                        onKeyDown={this._handleKeyDown.bind(this)}
                        onBlur={this._handleBlur.bind(this)}
                        maxLength={80}
                        autoFocus
                    />
                </div>
            );
        }

        const className = classNames({
            [styles.common]: !todo.completed,
            [styles.completed]: todo.completed
        });

        return (
            <div className={className}>
                <input
                    className={styles.toggler}
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => completeTodo(todo.id, todo.completed)}
                />
                <div className={styles.content} onDoubleClick={this._handleDoubleClick.bind(this)}>
                    <span className={styles.text} title={todo.text}>
                        {todo.text}
                    </span>
                </div>
                <span className={styles.delete} onClick={() => deleteTodo(todo.id)} title="Remove">
                    <i className="material-icons">delete</i>
                </span>
            </div>
        );
    }

    render() {
        return (
            <div className={styles.wrap}>
                {this._renderContent()}
            </div>
        );
    }
}

TodoItem.displayName = 'TodoItem';

TodoItem.propTypes = {
    createTodo: React.PropTypes.func.isRequired,
    completeTodo: React.PropTypes.func.isRequired,
    deleteLocalTodo: React.PropTypes.func.isRequired,
    deleteTodo: React.PropTypes.func.isRequired,
    editTodo: React.PropTypes.func.isRequired,

    todo: React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        text: React.PropTypes.string.isRequired,
        completed: React.PropTypes.bool.isRequired,
        new: React.PropTypes.boolean
    })
};

export default TodoItem;

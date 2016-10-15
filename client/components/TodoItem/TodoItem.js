import { ENTER, ESCAPE } from 'constants/KeyboardCodes';
import classNames from 'classnames';
import { injectIntl } from 'react-intl';
import TodoItemRecord from 'records/TodoRecord';
import styles from './TodoItem.styl';

class TodoItem extends React.PureComponent {

    static displayName = 'TodoItem';

    static propTypes = {
        createTodo: React.PropTypes.func.isRequired,
        completeTodo: React.PropTypes.func.isRequired,
        deleteLocalTodo: React.PropTypes.func.isRequired,
        deleteTodo: React.PropTypes.func.isRequired,
        editTodo: React.PropTypes.func.isRequired,

        todo: React.PropTypes.instanceOf(TodoItemRecord).isRequired,
        intl: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            editText: props.todo.text
        };
    }

    componentDidUpdate() {
        if (this.state.editing || this.props.todo.new) {

            if (this._editField.selectionStart === 0) {
                this._editField.selectionStart = this._editField.value.length;
            }

            this._editField.focus();
        }
    }

    _handleTextChange(event) {
        this.setState({ editText: event.target.value });
    }

    _handleTextClick() {
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
            createTodo(todo, newTitle);
        } else {
            editTodo(todo.id, newTitle);
        }

        this.setState({
            editing: false,
            editText: newTitle
        });
    }

    _renderContent() {
        const { todo, deleteTodo, completeTodo, intl } = this.props;

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
                <div className={styles.content} onClick={this._handleTextClick.bind(this)}>
                    <span className={styles.text} title={todo.text}>
                        {todo.text}
                    </span>
                </div>
                <span
                    className={styles.delete}
                    onClick={() => deleteTodo(todo.id)}
                    title={intl.formatMessage({ id: 'remove' })}>
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

export default injectIntl(TodoItem);

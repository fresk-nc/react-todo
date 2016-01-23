import TodoActions from 'actions/TodoActions';
import classNames from 'classnames';
import './index.styl';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

export default React.createClass({

    displayName: 'TodoItem',

    getInitialState: function() {
        return {
            isEdit: false,
            editText: this.props.todo.title
        };
    },

    componentDidUpdate: function() {
        if (this.state.isEdit) {
            var node = ReactDOM.findDOMNode(this.refs.editField);
            node.focus();
            node.setSelectionRange(node.value.length, node.value.length);
        }
    },

    render: function() {
        var todo = this.props.todo;
        var editInput;

        if (this.state.isEdit) {
            editInput = (<input
                            ref="editField"
                            className="todo-item__edit"
                            value={this.state.editText}
                            onKeyDown={this._handleKeyDown}
                            onChange={this._handleChange}
                            onBlur={this._handleSubmit}
                        />);
        }

        return (
            <div
                className={classNames('todo-item', {
                    'is-complete': todo.complete,
                    'is-edit': this.state.isEdit
                })}>
                <input
                    className="todo-item__toggle"
                    type="checkbox"
                    checked={todo.complete}
                    onChange={this._handleToggleComplete}
                />
                <span className="todo-item__title" onClick={this._handleTitleClick}>
                    {todo.title}
                </span>
                <span className="todo-item__delete" onClick={this._handleDeleteClick}>×</span>
                {editInput}
            </div>
        );
    },

    _handleToggleComplete: function() {
        TodoActions.toggleComplete(this.props.todo);
    },

    _handleDeleteClick: function() {
        TodoActions.deleteItem(this.props.todo);
    },

    _handleTitleClick: function() {
        this.setState({
            isEdit: true
        });
    },

    _handleKeyDown: function(event) {
        if (event.which === ESCAPE_KEY) {
            this.setState({
                isEdit: false,
                editText: this.props.todo.title
            });
        } else if (event.which === ENTER_KEY) {
            this._save();
        }
    },

    _handleChange: function(event) {
        this.setState({
            editText: event.target.value
        });
    },

    _handleSubmit: function() {
        this._save();
    },

    _save: function() {
        var newTitle = this.state.editText.trim();
        var isValidTitle = (newTitle !== '');

        if (isValidTitle) {
            TodoActions.updateTitle(this.props.todo, newTitle);
        }

        this.setState({
            isEdit: false,
            editText: (isValidTitle) ? newTitle : this.props.todo.title
        });
    }
});

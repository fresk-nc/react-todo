import TodoActions from 'actions/TodoActions';
import classNames from 'classnames';
import './index.styl';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

let TodoItem = React.createClass({

    displayName: 'TodoItem',

    getInitialState: function() {
        return {
            isEdit: this.props.todo.isNew,
            editText: this.props.todo.title
        };
    },

    componentDidUpdate: function() {
        if (this.state.isEdit) {
            let input = ReactDOM.findDOMNode(this.refs.editField);
            input.setSelectionRange(input.value.length, input.value.length);
        }
    },

    render: function() {
        return (
            <div
                className={classNames('todo-item', {
                    'is-complete': this.props.todo.complete,
                    'is-edit': this.state.isEdit
                })}>
                <input
                    className="todo-item__toggle"
                    type="checkbox"
                    checked={this.props.todo.complete}
                    onChange={this._handleToggleComplete}
                />
                <div className="todo-item__content" onClick={this._handleContentClick}>
                    {this._renderContent()}
                </div>
                <span className="todo-item__delete" onClick={this._handleDeleteClick}>×</span>
            </div>
        );
    },

    _renderContent: function() {
        if (this.state.isEdit) {
            return (
                <input
                    ref="editField"
                    className="todo-item__edit"
                    value={this.state.editText}
                    onKeyDown={this._handleKeyDown}
                    onChange={this._handleChange}
                    onBlur={this._handleBlur}
                    maxLength={80}
                    autoFocus
                />
            );
        } else {
            return (
                <span className="todo-item__title">
                    {this.props.todo.title}
                </span>
            );
        }
    },

    _handleToggleComplete: function() {
        TodoActions.updateItem(this.props.todo, {
            complete: !this.props.todo.complete
        });
    },

    _handleDeleteClick: function() {
        TodoActions.deleteItem(this.props.todo);
    },

    _handleContentClick: function() {
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

    _handleBlur: function() {
        this._save();
    },

    _save: function() {
        let newTitle = this.state.editText.trim();

        TodoActions.updateItem(this.props.todo, {
            title: newTitle,
            isNew: false
        });

        this.setState({
            isEdit: false,
            editText: newTitle
        });
    }
});

if (NODE_ENV === 'development') {
    TodoItem.propTypes = {
        todo: React.PropTypes.object.isRequired
    };
}

export default TodoItem;

import TodoActions from 'actions/TodoActions';
import classNames from 'classnames';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import './index.styl';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

export default React.createClass({

    displayName: 'TodoItem',

    propTypes: {
        todo: React.PropTypes.shape({
            id: React.PropTypes.number,
            title: React.PropTypes.string,
            complete: React.PropTypes.bool,
            isNew: React.PropTypes.bool
        })
    },

    mixins: [ PureRenderMixin, LinkedStateMixin ],

    getInitialState: function() {
        return {
            isEdit: this.props.todo.isNew,
            editText: this.props.todo.title
        };
    },

    componentDidUpdate: function() {
        if (this.state.isEdit) {
            let valueLength = this._editField.value.length;
            this._editField.setSelectionRange(valueLength, valueLength);
        }
    },

    _handleCompleteToggle: function() {
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
    },

    _renderContent: function() {
        if (this.state.isEdit) {
            return (
                <input
                    ref={(c) => this._editField = c}
                    className="todo-item__edit"
                    valueLink={this.linkState('editText')}
                    onKeyDown={this._handleKeyDown}
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
                    onChange={this._handleCompleteToggle}
                    />
                <div className="todo-item__content" onClick={this._handleContentClick}>
                    {this._renderContent()}
                </div>
                <span className="todo-item__delete" onClick={this._handleDeleteClick}>×</span>
            </div>
        );
    }

});

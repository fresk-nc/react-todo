import TodoActions from 'actions/TodoActions';
import classNames from 'classnames';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import styles from './TodoItem.styl';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

export default React.createClass({

    displayName: 'TodoItem',

    propTypes: {
        id: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        isCompleted: React.PropTypes.bool.isRequired,
        isNew: React.PropTypes.bool.isRequired
    },

    mixins: [ PureRenderMixin, LinkedStateMixin ],

    getInitialState: function() {
        return {
            isEdit: this.props.isNew,
            editText: this.props.title
        };
    },

    componentDidUpdate: function() {
        if (this.state.isEdit) {
            let valueLength = this._editField.value.length;
            this._editField.setSelectionRange(valueLength, valueLength);
        }
    },

    _handleCompleteToggle: function() {
        TodoActions.updateItem(this.props.id, {
            isCompleted: !this.props.isCompleted
        });
    },

    _handleDeleteClick: function() {
        TodoActions.deleteItem(this.props.id);
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
                editText: this.props.title
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

        TodoActions.updateItem(this.props.id, {
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
                    className={styles.editField}
                    valueLink={this.linkState('editText')}
                    onKeyDown={this._handleKeyDown}
                    onBlur={this._handleBlur}
                    maxLength={80}
                    autoFocus
                    />
            );
        } else {
            return (
                <span className={styles.title}>
                    {this.props.title}
                </span>
            );
        }
    },

    render: function() {
        return (
            <div
                className={classNames({
                    [styles.common]: !this.props.isCompleted && !this.state.isEdit,
                    [styles.completed]: this.props.isCompleted && !this.state.isEdit,
                    [styles.editable]: this.state.isEdit
                })}>
                <input
                    className={styles.toggler}
                    type="checkbox"
                    checked={this.props.isCompleted}
                    onChange={this._handleCompleteToggle}
                    />
                <div className={styles.content} onClick={this._handleContentClick}>
                    {this._renderContent()}
                </div>
                <span className={styles.delete} onClick={this._handleDeleteClick}>×</span>
            </div>
        );
    }

});

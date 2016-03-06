import TodoActions from 'actions/TodoActions';
import classNames from 'classnames';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import styles from './TodoItem.styl';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;
const DELAY_AFTER_DELETE = 500;

let timer;

export default class TodoItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isEdit: props.isNew,
            isRemoved: false,
            editText: props.title
        };

        this._handleCompleteToggle = this._handleCompleteToggle.bind(this);
        this._handleTitleChange = this._handleTitleChange.bind(this);
        this._handleDeleteClick = this._handleDeleteClick.bind(this);
        this._handleContentClick = this._handleContentClick.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);
        this._handleBlur = this._handleBlur.bind(this);
        this._handleUndoDeleteClick = this._handleUndoDeleteClick.bind(this);
        this._startDeleteFromList = this._startDeleteFromList.bind(this);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidUpdate() {
        if (this.state.isEdit) {
            let valueLength = this._editField.value.length;
            this._editField.setSelectionRange(valueLength, valueLength);
        }
    }

    _handleCompleteToggle() {
        TodoActions.updateItem(this.props.id, {
            isCompleted: !this.props.isCompleted
        });
    }

    _handleTitleChange(event) {
        this.setState({
            editText: event.target.value
        });
    }

    _handleDeleteClick() {
        TodoActions.deleteItem(this.props.id);

        this.setState({
            isRemoved: true
        });
    }

    _handleContentClick() {
        this.setState({
            isEdit: true
        });
    }

    _handleKeyDown(event) {
        if (event.which === ESCAPE_KEY) {
            this.setState({
                isEdit: false,
                editText: this.props.title
            });
        } else if (event.which === ENTER_KEY) {
            this._save();
        }
    }

    _handleBlur() {
        this._save();
    }

    _handleUndoDeleteClick() {
        this._stopDeleteFromList();

        TodoActions.undoDeleteItem(this.props.id);

        this.setState({
            isRemoved: false
        });
    }

    _startDeleteFromList() {
        if (this.state.isRemoved) {
            timer = setTimeout(() => {
                TodoActions.deleteItemFromList(this.props.id);
            }, DELAY_AFTER_DELETE);
        }
    }

    _stopDeleteFromList() {
        clearTimeout(timer);
    }

    _save() {
        let newTitle = this.state.editText.trim();

        TodoActions.updateItem(this.props.id, {
            title: newTitle,
            isNew: false
        });

        this.setState({
            isEdit: false,
            editText: newTitle
        });
    }

    _renderContent() {
        if (this.state.isEdit) {
            return (
                <input
                    ref={(c) => this._editField = c}
                    className={styles.editField}
                    value={this.state.editText}
                    onChange={this._handleTitleChange}
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
    }

    render() {
        return (
            <div className={styles.wrap}>

                <div
                    className={classNames({
                        [styles.common]: !this.props.isCompleted && !this.state.isEdit && !this.state.isRemoved,
                        [styles.completed]: this.props.isCompleted && !this.state.isEdit && !this.state.isRemoved,
                        [styles.editable]: this.state.isEdit && !this.state.isRemoved,
                        [styles.removed]: this.state.isRemoved
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

                <div
                    className={styles.undoWrapper}
                    onMouseEnter={this._stopDeleteFromList}
                    onMouseLeave={this._startDeleteFromList}
                    >
                    <span>
                        Removed
                    </span>
                    <span className={styles.undo} onClick={this._handleUndoDeleteClick}>
                        UNDO
                    </span>
                </div>

            </div>
        );
    }
}

TodoItem.displayName = 'TodoItem';
TodoItem.propTypes = {
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    isCompleted: React.PropTypes.bool.isRequired,
    isNew: React.PropTypes.bool.isRequired
};

export default TodoItem;

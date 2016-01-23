import TodoActions from 'actions/TodoActions';
import './index.styl';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

export default React.createClass({

    displayName: 'TodoCreate',

    getInitialState: function() {
        return {
            isActive: false,
            value: ''
        };
    },

    componentDidUpdate: function() {
        if (this.state.isActive) {
            let input = ReactDOM.findDOMNode(this.refs.createField);
            input.focus();
            input.setSelectionRange(input.value.length, input.value.length);
        }
    },

    render: function() {
        let node;

        if (this.state.isActive) {
            node = (
                <input
                    ref="createField"
                    className="todo-create__input"
                    value={this.state.value}
                    onChange={this._handleChange}
                    onBlur={this._handleBlur}
                    onKeyDown={this._handleKeyDown}
                />
            );
        } else {
            node = (
                <span className="todo-create__link" onClick={this._handleLinkClick}>
                    +
                </span>
            );
        }

        return (
            <div className="todo-create">
                {node}
            </div>
        );
    },

    _handleLinkClick: function() {
        this.setState({
            isActive: true
        });
    },

    _handleChange: function(event) {
        this.setState({
            value: event.target.value
        });
    },

    _handleBlur: function() {
        this.setState({
            isActive: false
        });
    },

    _handleKeyDown: function(event) {
        if (event.which === ESCAPE_KEY) {
            this._close();
        } else if (event.which === ENTER_KEY) {
            this._create();
            this._close();
        }
    },

    _close: function() {
        this.setState({
            isActive: false,
            value: ''
        });
    },

    _create: function() {
        let title = this.state.value.trim();
        let isValidTitle = (title !== '');

        if (isValidTitle) {
            TodoActions.createItem({
                title: title,
                complete: false
            });
        }
    }

});

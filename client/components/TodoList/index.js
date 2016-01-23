import ComponentTodoItem from 'components/TodoItem';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './index.styl';

export default React.createClass({

    displayName: 'TodoList',

    render: function() {
        return (
            <div className="todo-list">
                {this._renderContent()}
            </div>
        );
    },

    _renderContent() {
        let items = this.props.items;
        let nodes = [];

        for (var key in items) {
            nodes.push(<ComponentTodoItem key={key} todo={items[key]} />);
        }

        if (nodes.length > 0) {
            return (
                <ReactCSSTransitionGroup
                    transitionName="todo-list"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}>
                    {nodes}
                </ReactCSSTransitionGroup>
            );
        } else {
            return (
                <div className="todo-list__empty">
                    It's the nice time to do something
                </div>
            );
        }
    }

});

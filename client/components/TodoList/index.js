import ComponentTodoItem from 'components/TodoItem';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './index.styl';

export default React.createClass({
    render: function() {
        var items = this.props.items;
        var nodes = [];

        for (var key in items) {
            nodes.push(<ComponentTodoItem key={key} todo={items[key]} />);
        }

        return (
            <div className="todo-list">
                <ReactCSSTransitionGroup transitionName="todo-list" transitionEnterTimeout={0} transitionLeaveTimeout={300}>
                    {nodes}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
});

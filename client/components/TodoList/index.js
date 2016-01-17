import ComponentTodoItem from 'components/TodoItem';

export default React.createClass({
    render: function() {
        var items = this.props.items;
        var nodes = [];

        for (var key in items) {
            nodes.push(<ComponentTodoItem key={key} todo={items[key]} />);
        }

        return (
            <div className="todo-list">
                {nodes}
            </div>
        );
    }
});

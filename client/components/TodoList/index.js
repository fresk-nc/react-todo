let TodoItem = React.createClass({
    render: function() {
        return (
            <div className="todo-item">
                {this.props.title}
            </div>
        );
    }
});

export default React.createClass({
    render: function() {
        var nodes = this.props.items.map(function(item) {
            return (
                <TodoItem title={item.title} key={item.id} />
            );
        });

        return (
            <div className="todo-list">
                {nodes}
            </div>
        );
    }
});

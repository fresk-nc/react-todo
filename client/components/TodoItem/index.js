import TodoActions from 'actions/TodoActions';
import classNames from 'classnames';
import './index.styl';

export default React.createClass({
    _onToggleComplete: function() {
        TodoActions.toggleComplete(this.props.todo);
    },
    render: function() {
        var todo = this.props.todo;

        return (
            <div
                className={classNames('todo-item', {
                    'is-complete': todo.complete
                })}>
                <input
                    className="todo-item__toggle"
                    type="checkbox"
                    checked={todo.complete}
                    onChange={this._onToggleComplete}
                />
                <span className="todo-item__title">
                    {todo.title}
                </span>
            </div>
        );
    }
});

import ComponentTodoList from 'components/TodoList';
import './index.styl';

export default React.createClass({
    render: function() {
        return (
            <div className="main-section">
                <ComponentTodoList items={this.props.items} />
            </div>
        );
    }
});

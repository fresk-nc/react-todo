import ComponentTodoList from 'components/TodoList';
import ComponentTodoCreate from 'components/TodoCreate';
import './index.styl';

export default React.createClass({

    displayName: 'MainSection',

    render: function() {
        return (
            <div className="main-section">
                <ComponentTodoList items={this.props.items} />
                <ComponentTodoCreate />
            </div>
        );
    }

});

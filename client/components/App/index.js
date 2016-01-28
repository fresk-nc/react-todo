import ComponentTodoList from 'components/TodoList';
import TodoActions from 'actions/TodoActions';
import './index.styl';

export default React.createClass({

    displayName: 'App',

    render: function () {
        return (
            <div className="app">
                <div className="app__header">
                    <div className="app__create-button" onClick={this._handleClickCreate}>
                        +
                    </div>
                </div>
                <div className="app__content">
                    <ComponentTodoList />
                </div>
            </div>
        );
    },

    _handleClickCreate: function() {
        TodoActions.createItem();
    }

});

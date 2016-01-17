import TodoStore from 'stores/TodoStore';
import ComponentHeader from 'components/Header';
import ComponentMainSection from 'components/MainSection';

export default React.createClass({

    _getTodoState: function() {
        return {
            items: TodoStore.getAll()
        };
    },

    _onChange: function() {
        this.setState(this._getTodoState());
    },

    getInitialState: function() {
        return this._getTodoState();
    },

    componentDidMount: function() {
        TodoStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TodoStore.removeChangeListener(this._onChange);
    },

    render: function () {
        return (
            <div className="app">
                <ComponentHeader />
                <ComponentMainSection items={this.state.items} />
            </div>
        );
    }

});

import TodoList from 'components/TodoList';
import CreateButton from 'components/CreateButton';
import styles from './App.styl';

export default React.createClass({

    displayName: 'App',

    render: function () {
        return (
            <div>
                <div className={styles.header}>
                    <CreateButton />
                </div>
                <div className={styles.content}>
                    <TodoList />
                </div>
            </div>
        );
    }

});

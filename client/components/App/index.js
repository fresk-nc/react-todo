import TodoList from 'components/TodoList';
import CreateButton from 'components/CreateButton';
import styles from './App.styl';

class App extends React.Component {

    render() {
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

}

App.displayName = 'App';

export default App;

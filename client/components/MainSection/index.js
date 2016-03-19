import TodoList from 'components/TodoList';
import Button from 'components/Button';
import Spinner from 'components/Spinner';
import LoadError from 'components/LoadError';
import styles from './MainSection.styl';

class MainSection extends React.Component {

    constructor(props) {
        super(props);
    }

    _renderCreateButton() {
        const { actions, status } = this.props;

        if (status.get('request') || status.get('error')) {
            return null;
        }

        return (
            <div className={styles.createButton}>
                <Button type="round" onClick={() => actions.createLocalTodo()}>
                    <i className="material-icons">add</i>
                </Button>
            </div>
        );
    }


    _renderSpinner() {
        const { status } = this.props;

        if (status.get('request')) {
            return (
                <div className={styles.spinner}>
                    <Spinner />
                </div>
            );
        }

        return null;
    }

    _renderLoadError() {
        const { status } = this.props;

        if (status.get('error')) {
            return (
                <div className={styles.loadError}>
                    <LoadError />
                </div>
            );
        }

        return null;
    }

    render() {
        const { todos, actions } = this.props;

        return (
            <main className={styles.wrap}>
                {this._renderCreateButton()}
                <div className={styles.listWrap}>
                    {this._renderSpinner()}
                    {this._renderLoadError()}
                    <TodoList todos={todos} actions={actions} />
                </div>
            </main>
        );
    }

}

MainSection.displayName = 'MainSection';

MainSection.propTypes = {
    todos: React.PropTypes.object,
    actions: React.PropTypes.object,
    status: React.PropTypes.object
};

export default MainSection;

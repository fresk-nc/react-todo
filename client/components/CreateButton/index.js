import TodoActions from 'actions/TodoActions';
import styles from './CreateButton.styl';

class CreateButton extends React.Component {

    _handleCreateClick() {
        TodoActions.createItem();
    }

    render() {
        return (
            <span className={styles.common} onClick={this._handleCreateClick}>
                +
            </span>
        );
    }

}

CreateButton.displayName = 'CreateButton';

export default CreateButton;

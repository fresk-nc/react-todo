import TodoActions from 'actions/TodoActions';
import styles from './CreateButton.styl';

export default React.createClass({

    displayName: 'CreateButton',

    _handleCreateClick: function() {
        TodoActions.createItem();
    },

    render: function () {
        return (
            <span className={styles.common} onClick={this._handleCreateClick}>
                +
            </span>
        );
    }

});

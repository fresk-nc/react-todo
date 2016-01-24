import './styles/index.styl';
import TodoActions from 'actions/TodoActions';
import ComponentApp from 'components/App';

TodoActions.requestItems();

ReactDOM.render((
    <ComponentApp />
), document.getElementById('app'));

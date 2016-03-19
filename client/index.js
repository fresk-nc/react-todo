import { Provider } from 'react-redux';
import Root from 'containers/Root';
import './styles/index.styl';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render((
    <Provider store={store}>
        <Root />
    </Provider>
), document.getElementById('root'));


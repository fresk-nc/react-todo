import Root from 'containers/Root';
import './styles/index.styl';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root')
);

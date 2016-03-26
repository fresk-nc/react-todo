import { Provider } from 'react-redux';
import App from './App.js';

export default class Root extends React.Component {
    render() {
        const { store } = this.props;
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

Root.propTypes = {
    store: React.PropTypes.object.isRequired
};

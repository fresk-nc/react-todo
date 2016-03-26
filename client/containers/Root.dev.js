import { Provider } from 'react-redux';
import App from './App.js';
import DevTools from './DevTools.js';

export default class Root extends React.Component {
    render() {
        const { store } = this.props;
        return (
            <Provider store={store}>
                <div>
                    <App />
                    <DevTools />
                </div>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: React.PropTypes.object.isRequired
};

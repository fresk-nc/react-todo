import { Provider } from 'react-intl-redux';
import App from './App.js';

export default class Root extends React.Component {

    static displayName = 'Root';

    static propTypes = {
        store: React.PropTypes.object.isRequired
    };

    render() {
        return (
            <Provider store={this.props.store}>
                <App />
            </Provider>
        );
    }
}

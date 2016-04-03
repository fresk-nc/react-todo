import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import App from './App.js';
import DevTools from './DevTools.js';

export default class Root extends React.Component {
    render() {
        const { store, locale, messages } = this.props;
        return (
            <Provider store={store}>
                <div>
                    <IntlProvider locale={locale} messages={messages}>
                        <App />
                    </IntlProvider>
                    <DevTools />
                </div>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: React.PropTypes.object.isRequired,
    locale: React.PropTypes.string.isRequired,
    messages: React.PropTypes.object.isRequired
};

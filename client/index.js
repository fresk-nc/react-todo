import Root from 'containers/Root';
import configureStore from './store/configureStore';
import loadLocale from 'utils/loadLocale';
import config from './config';
import './styles/index.styl';

let locale = navigator.language.split('-')[0];

if (!config.availableLocales.includes(locale)) {
    locale = config.defaultLocale;
}

loadLocale(locale, (messages) => {
    const store = configureStore({
        intl: {
            defaultLocale: config.defaultLocale,
            locale,
            messages
        }
    });

    ReactDOM.render(
        <Root store={store} />,
        document.getElementById('root')
    );
});

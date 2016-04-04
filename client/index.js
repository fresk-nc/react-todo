import Root from 'containers/Root';
import configureStore from './store/configureStore';
import { addLocaleData } from 'react-intl';
import config from './config';
import './styles/index.styl';

let locale = navigator.language.split('-')[0];

if (!config.availableLocales.includes(locale)) {
    locale = config.defaultLocale;
}

const waitForChunk = require('bundle?name=[name]!loc/' + locale + '.js');

if (!window.Intl) {
    require.ensure([], (require) => {
        require('intl');
        require.context('intl/locale-data/jsonp/', false, /ru\.js|en\.js/)('./' + locale + '.js');
        runApp();
    });
} else {
    runApp();
}

function runApp() {
    waitForChunk((intlData) => {
        const { messages, localeData } = intlData;
        const store = configureStore();

        addLocaleData(localeData);

        ReactDOM.render(
            <Root store={store} locale={locale} messages={messages} />,
            document.getElementById('root')
        );
    });
}

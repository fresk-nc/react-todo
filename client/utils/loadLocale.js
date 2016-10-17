import { addLocaleData } from 'react-intl';

export default function(locale, cb) {
    const waitForChunk = require('bundle?name=[name]!loc/' + locale + '.js');

    if (!window.Intl) {
        require.ensure([], (require) => {
            require('intl');
            require.context('intl/locale-data/jsonp/', false, /ru\.js|en\.js/)('./' + locale + '.js');
            load(waitForChunk, cb);
        });
    } else {
        load(waitForChunk, cb);
    }
}

function load(waitForChunk, cb) {
    waitForChunk((intlData) => {
        addLocaleData(intlData.localeData);
        cb(intlData.messages);
    });
}

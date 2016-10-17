import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateIntl } from 'react-intl-redux';
import className from 'classnames';
import loadLocale from 'utils/loadLocale';
import config from '../../config';
import styles from './LanguageSwitcher.styl';

class LanguageSwitcher extends React.PureComponent {

    static displayName = 'LanguageSwitcher';

    static propTypes = {
        updateIntl: React.PropTypes.func.isRequired,
        currentLocale: React.PropTypes.string.isRequired
    };

    _handleClick(locale) {
        loadLocale(locale, (messages) => {
            this.props.updateIntl({
                locale,
                messages
            });
        });
    }

    render() {
        return (
            <div className={styles.wrap}>
                {config.availableLocales.map((locale) => {
                    const isCurrent = this.props.currentLocale === locale;
                    const classes = className({
                        [styles.commonLink]: !isCurrent,
                        [styles.currentLink]: isCurrent
                    });
                    return (
                        <div
                            className={classes}
                            key={locale}
                            onClick={this._handleClick.bind(this, locale)}
                        >
                            {locale}
                        </div>
                    );
                })}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentLocale: state.intl.locale
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateIntl
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcher);

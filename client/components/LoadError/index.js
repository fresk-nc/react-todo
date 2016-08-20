import { FormattedMessage } from 'react-intl';
import styles from './LoadError.styl';

export default class LoadError extends React.PureComponent {

    static displayName = 'LoadError';

    render() {
        return (
            <div className={styles.wrap}>
                <div className={styles.img}>
                    <i className="material-icons">cloud_off</i>
                </div>
                <p className={styles.text}>
                    <FormattedMessage id="loadError" />
                </p>
            </div>
        );
    }
}

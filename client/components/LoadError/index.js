import { FormattedMessage } from 'react-intl';
import styles from './LoadError.styl';

class LoadError extends React.Component {

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

LoadError.displayName = 'LoadError';

export default LoadError;

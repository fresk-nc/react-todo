import { FormattedMessage } from 'react-intl';
import styles from './Footer.styl';

export default class Footer extends React.PureComponent {

    static displayName = 'Footer';

    render() {
        return (
            <footer className={styles.wrap}>
                <p className={styles.text}>
                    <FormattedMessage
                        id="sourceCode"
                        values={{
                            link: (
                                <a
                                    className={styles.link}
                                    href="https://github.com/fresk-nc/react-todo"
                                    target="_blink">
                                    <FormattedMessage id="githubLink" />
                                </a>
                            )
                        }}
                    />
                </p>
            </footer>
        );
    }
}

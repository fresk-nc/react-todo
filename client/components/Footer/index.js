import { FormattedMessage } from 'react-intl';
import styles from './Footer.styl';

class Footer extends React.Component {

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

Footer.displayName = 'Footer';

export default Footer;

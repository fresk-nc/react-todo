import styles from './Footer.styl';

class Footer extends React.Component {

    render() {
        return (
            <footer className={styles.wrap}>
                <p className={styles.text}>
                    You may view the
                    <a className={styles.link}
                       href="https://github.com/fresk-nc/react-todo" target="_blink"
                    > Source Code </a>
                    on GitHub
                </p>
            </footer>
        );
    }

}

Footer.displayName = 'Footer';

export default Footer;

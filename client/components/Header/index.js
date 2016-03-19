import styles from './Header.styl';

class Header extends React.Component {

    render() {
        return (
            <header className={styles.wrap}></header>
        );
    }

}

Header.displayName = 'Header';

export default Header;

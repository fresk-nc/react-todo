import styles from './Header.styl';

export default class Header extends React.PureComponent {

    static displayName = 'Header';

    render() {
        return (
            <header className={styles.wrap}></header>
        );
    }
}

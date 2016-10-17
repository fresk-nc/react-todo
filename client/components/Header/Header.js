import LanguageSwitcher from 'components/LanguageSwitcher';
import styles from './Header.styl';

export default class Header extends React.PureComponent {

    static displayName = 'Header';

    render() {
        return (
            <header className={styles.wrap}>
                <div className={styles.switcher}>
                    <LanguageSwitcher />
                </div>
            </header>
        );
    }
}

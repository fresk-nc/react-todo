import classNames from 'classnames';
import styles from './Snackbar.styl';

const ANIMATION_LENGTH = 200;

class Snackbar extends React.Component {

    constructor(props) {
        super(props);
        this.timeoutId = null;
        this.clearTimeoutId = null;
        this.clearTimer = this._clearTimer.bind(this);
        this.state = { open: false };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ open: nextProps.active });
    }

    componentDidUpdate() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        if (this.props.active) {
            this.timeoutId = setTimeout(this.clearTimer, this.props.timeout);
        }
    }

    componentWillUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        if (this.clearTimeoutId) {
            clearTimeout(this.clearTimeoutId);
            this.clearTimeoutId = null;
        }
    }

    _clearTimer() {
        this.timeoutId = null;
        this.setState({ open: false });

        this.clearTimeoutId = setTimeout(() => {
            this.clearTimeoutId = null;
            this.props.onTimeout();
        }, ANIMATION_LENGTH);
    }

    render() {
        const { open } = this.state;

        const className = classNames({
            [styles.common]: !open,
            [styles.active]: open
        });

        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }

}

Snackbar.displayName = 'Snackbar';

Snackbar.propTypes = {
    onTimeout: React.PropTypes.func.isRequired,
    children: React.PropTypes.node,
    timeout: React.PropTypes.number,
    active: React.PropTypes.bool.isRequired
};

Snackbar.defaultProps = {
    timeout: 2500
};

export default Snackbar;

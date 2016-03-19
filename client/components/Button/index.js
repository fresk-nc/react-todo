import styles from './Button.styl';

class Button extends React.Component {

    render() {
        return (
            <span className={styles[this.props.type]} onClick={this.props.onClick}>
                {this.props.children}
            </span>
        );
    }

}

Button.displayName = 'Button';

Button.propTypes = {
    onClick: React.PropTypes.func,
    type: React.PropTypes.string.isRequired,
    children: React.PropTypes.node
};

export default Button;

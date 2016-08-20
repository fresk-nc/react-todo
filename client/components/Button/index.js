import styles from './Button.styl';

export default class Button extends React.PureComponent {

    static displayName = 'Button';

    static propTypes = {
        onClick: React.PropTypes.func,
        type: React.PropTypes.string.isRequired,
        children: React.PropTypes.node
    };

    render() {
        return (
            <span className={styles[this.props.type]} onClick={this.props.onClick}>
                {this.props.children}
            </span>
        );
    }
}

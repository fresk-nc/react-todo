import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from 'components/App';
import * as TodoActions from 'actions';

class Root extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.getTodos();
    }

    render() {
        return (
            <App {...this.props} />
        );
    }

}

Root.displayName = 'Root';

Root.propTypes = {
    actions: React.PropTypes.object.isRequired,
    todos: React.PropTypes.object.isRequired,
    status: React.PropTypes.object.isRequired,
    notifications: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        todos: state.todos,
        status: state.status,
        notifications: state.notifications
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(TodoActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Root);

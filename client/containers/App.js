import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TodoActions from 'actions';
import { FormattedMessage } from 'react-intl';

import Header from 'components/Header';
import MainSection from 'components/MainSection';
import Footer from 'components/Footer';
import Snackbar from 'components/Snackbar';

class App extends React.Component {

    static displayName = 'App';

    static propTypes = {
        // fixme: object -> instanceOf(List || Map)
        actions: React.PropTypes.object.isRequired,
        todos: React.PropTypes.object.isRequired,
        status: React.PropTypes.object.isRequired,
        notifications: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this._handleTimeoutSnackbar = this._handleTimeoutSnackbar.bind(this);
        this.state = { isSnackbarActive: false };
    }

    componentDidMount() {
        this.props.actions.getTodos();
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.isSnackbarActive) {
            return;
        }

        if (nextProps.notifications.size) {
            this.setState({
                isSnackbarActive: true
            });
        }
    }

    _handleTimeoutSnackbar() {
        this.setState({ isSnackbarActive: false });
        this.props.actions.deleteNotification();
    }

    _renderSnackbarContent() {
        const { notifications } = this.props;

        if (!notifications.size) {
            return null;
        }

        const type = notifications.first().get('type');

        return (
            <FormattedMessage id={type} />
        );
    }

    render() {
        const { todos, actions, status } = this.props;
        const { isSnackbarActive } = this.state;

        return (
            <div>
                <Header />
                <MainSection todos={todos} actions={actions} status={status} />
                <Footer />
                <Snackbar active={isSnackbarActive} onTimeout={this._handleTimeoutSnackbar}>
                    {this._renderSnackbarContent()}
                </Snackbar>
            </div>
        );
    }
}

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
)(App);

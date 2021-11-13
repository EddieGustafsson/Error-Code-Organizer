import React from 'react';
import { Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { clearErrors } from '../actions/errorActions';
import PropTypes from 'prop-types';

class AlertMessage extends React.Component {

    state = {
        errorStatus: null,
        errorMessage: 'Sorry! Something went wrong. Check for network issues and Javascript console errors.'
    };

    static propTypes = {
        error: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            this.setState({ errorMessage: error.message.message, errorStatus: error.status });
        }

    }

    render() {

        switch (this.state.errorStatus) {
            case 403:
            case 500:
                return (
                    <Message header='FAILURE' content={this.state.errorMessage} icon='exclamation triangle' negative />
                )
            case 401:
                return (
                    <Message header='WARNING' content={this.state.errorMessage} icon='exclamation triangle' warning />
                )
            case 404:
                return (
                    <Message header='FAILURE' content={this.state.errorMessage} icon='exclamation triangle' warning />
                )
            default:
                return (null)
        }

    }
}

const mapStateToProps = state => ({
    error: state.error
});

export default connect(
    mapStateToProps,
    { clearErrors }
)(AlertMessage);

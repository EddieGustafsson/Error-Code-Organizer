import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoadingContainer from '../components/LoadingContainer';

class PrivateRoute extends React.Component {

    state = {
        isLoading: true
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        isLoading: PropTypes.bool,
        success: PropTypes.bool
    }

    componentDidUpdate(prevProps) {
        const { isLoading } = this.props;
        if (isLoading !== prevProps.isLoading) {
            if(!isLoading) {
                this.setState({ isLoading: false });
            }
        }
    }

    render() {
        const {component: Component, ...rest} = this.props;

        if (this.state.isLoading && !this.props.success) {
            return(
                <LoadingContainer />
            );
        }

        return (
            <Route {...rest} render={props => (
                this.props.isAuthenticated ?
                    <Component {...props} />
                : <Redirect to="/auth/login" />
            )} />
        );

    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    success: state.auth.success,
    isLoading: state.auth.isLoading
});

export default connect(mapStateToProps)(PrivateRoute);

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PrivateRoute extends React.Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    render() {

        const {component: Component, ...rest} = this.props;

        return (

            // Show the component only when the user is logged in
            // Otherwise, redirect the user to /signin page
            <Route {...rest} render={props => (
                this.props.isAuthenticated ?
                    <Component {...props} />
                : <Redirect to="/auth/login" />
            )} />
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);

import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class UserLoginForm extends Component {

    state = { 
        userEmail: "",
        userPassword: "",

        formLoading: false,
        formSuccess: false,

        errorMessage: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            // Check for login error
            if(error.id === 'LOGIN_FAIL') {
                this.setState({ errorMessage: error.message.error.message });
            } else {
                this.setState({errorMessage: null});
            }
        }

    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value});
    };

    submitLoginForm = (e) => {
        let error = false;
        this.props.clearErrors();
        e.preventDefault();

        this.setState({ formLoading: true });

        if (error) {
            this.setState({ formError: true });
            return;
        }

        const { userEmail, userPassword } = this.state;

        let user = {
            email: userEmail,
            password: userPassword,
        }

        // Attempt to login user
        this.props.login(user);

        this.setState({ formSuccess: true });
        this.setState({ formLoading: false });

    }

    render() {

        if (this.props.isAuthenticated) {
            return(
                <Redirect to="/projects" />
            )
        }

        return (
            <div>
                <Form error={this.state.formError} loading={this.state.formLoading}>
                    <Form.Field>
                        <Form.Input
                            label='Email' 
                            type='email'
                            name='userEmail'
                            value={this.state.userEmail}
                            onChange={this.onChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            label='Password'
                            type='password'
                            name='userPassword'
                            value={this.state.userPassword}
                            onChange={this.onChange}
                        />
                    </Form.Field>
                    <Button 
                        positive
                        fluid
                        type='submit' 
                        loading={this.state.formLoading} 
                        disabled={!this.state.userEmail} 
                        onClick={this.submitLoginForm}
                    >Login</Button>
                </Form>
                { this.state.errorMessage ? <Message header='Failed to login account' content={this.state.errorMessage} negative/> : null }
            </div>
        )
    }
  }


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps,
    { login, clearErrors }
)(UserLoginForm);
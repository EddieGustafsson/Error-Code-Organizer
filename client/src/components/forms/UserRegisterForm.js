import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class UserRegisterForm extends Component {

    state = {
        userName: "",
        userUsername: "",
        userEmail: "",
        userPassword: "",
        userPassword2: "",

        formLoading: false,
        formSuccess: false,

        errorMessage: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ errorMessage: error.message.message });
            } else {
                this.setState({ errorMessage: null });
            }
        }

    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submitRegistrationForm = (e) => {
        let error = false;
        this.props.clearErrors();
        e.preventDefault();

        this.setState({ formLoading: true });

        if (error) {
            this.setState({ formError: true });
            return;
        }

        const { userName, userUsername, userEmail, userPassword, userPassword2 } = this.state;

        let user = {
            name: userName,
            username: userUsername,
            email: userEmail,
            password: userPassword,
            password2: userPassword2
        }

        // Attempt to register user
        this.props.register(user);

        this.setState({ formSuccess: true });
        this.setState({ formLoading: false });

    }

    render() {

        if (this.props.isAuthenticated) {
            return (
                <Redirect to="/projects" />
            )
        }

        return (
            <div>
                <Form error={this.state.formError} loading={this.state.formLoading}>
                    <Form.Field>
                        <Form.Input
                            label='Name'
                            name='userName'
                            value={this.state.userName}
                            onChange={this.onChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            label='Username'
                            name='userUsername'
                            value={this.state.userUsername}
                            onChange={this.onChange}
                        />
                    </Form.Field>
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
                    <Form.Field>
                        <Form.Input
                            label='Type password again'
                            type='password'
                            name='userPassword2'
                            value={this.state.userPassword2}
                            onChange={this.onChange}
                        />
                    </Form.Field>
                    <Button
                        positive
                        fluid
                        type='submit'
                        loading={this.state.formLoading}
                        disabled={!this.state.userPassword2}
                        onClick={this.submitRegistrationForm}
                    >Register account</Button>
                </Form>
                { this.state.errorMessage ? <Message header='Faild to register account' content={this.state.errorMessage} negative /> : null}
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
    { register, clearErrors }
)(UserRegisterForm);
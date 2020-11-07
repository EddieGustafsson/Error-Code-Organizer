import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import API from "../../api/apiMap";

export default class UserRegisterForm extends Component {

    constructor(props) {
        super(props);
        
        this.state = { 
            userName: "",
            userEmail: "",
            userPassword: "",
            userPassword2: "",

            formLoading: false,
            formSuccess: false,

            errorList: [],
            userNameError: false,
            userEmailError: false,
            userPasswordError: false,
            userPassword2Error: false, 
            formError: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitRegisterForm = this.submitRegisterForm.bind(this);
        this.postRegisterDetails = this.postRegisterDetails.bind(this);
    }

    submitRegisterForm() {
        let error = false;

        this.setState({ formLoading: true });

        if (!this.state.userEmail.replace(/\s/g, '').length) {
            this.setState({ userEmailError: true });
            error = true;
        } else {
            this.setState({ userEmailError: false });
        }

        if (error) {
            this.setState({ formError: true });
            return;
        }

        let user = {
            name: this.state.userName,
            email: this.state.userEmail,
            password: this.state.userPassword,
            password2: this.state.userPassword2
        }

        this.postRegisterDetails(user);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.name === 'test' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value    
        });
    }

    postRegisterDetails(user) {
        // POST request using fetch with error handling
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        fetch(API.register, requestOptions)
            .then(async response => {
                if(!response.ok) {
                    const responseJson = await response.json();
                    const list = [];

                    if(!responseJson.error.message) {
                        const values = Object.keys(responseJson.error).map(function (key) { return responseJson.error[key]; });
                        list.push(values);
                    } else {
                        list.push(responseJson.error.message);
                    }

                    this.setState({ formError: true, formLoading: false, errorList: list });
                } else {
                    this.setState({ formError: false, formSuccess: true, formLoading: false });
                }
            })
            .catch(error => {
                this.setState({ formError: true, formLoading: false, errorMessage: error.message });
            });
    }

    render() {
        return (
            <div>
                <Form error={this.state.formError} loading={this.state.formLoading}>
                    <Form.Field>
                        <Form.Input
                            label='Name' 
                            name='userName'
                            value={this.state.userName}
                            onChange={this.handleInputChange}
                            error={this.state.userNameError}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            label='Email' 
                            type='email'
                            name='userEmail'
                            value={this.state.userEmail}
                            onChange={this.handleInputChange}
                            error={this.state.userEmailError}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            label='Password'
                            type='password'
                            name='userPassword'
                            value={this.state.userPassword}
                            onChange={this.handleInputChange}
                            error={this.state.userPasswordError}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            label='Type password again'
                            type='password'
                            name='userPassword2'
                            value={this.state.userPassword2}
                            onChange={this.handleInputChange}
                            error={this.state.userPassword2Error}
                        />
                    </Form.Field>
                    <Button 
                        positive
                        fluid
                        type='submit' 
                        loading={this.state.formLoading} 
                        disabled={!this.state.userPassword2} 
                        onClick={this.submitRegisterForm}
                    >Create account</Button>
                </Form>

                {this.state.formError 
                ?
                    <Message 
                        error
                        header="Failed to login"
                        list={this.state.errorList}
                    />
                :
                null
                }
                {this.state.formSuccess 
                ?
                    <Redirect 
                        to={{
                            pathname: "/projects",
                            state: { referrer: "/auth/login" }
                        }}
                    />
                :
                null
                }
            </div>
        )
    }
  }

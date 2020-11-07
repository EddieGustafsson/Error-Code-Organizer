import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import API from "../../api/apiMap";

export default class UserLoginForm extends Component {

    constructor(props) {
        super(props);
        
        this.state = { 
            userEmail: "",
            userPassword: "",

            formLoading: false,
            formSuccess: false,

            errorList: [],
            userEmailError: false,
            userPasswordError: false, 
            formError: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitLoginForm = this.submitLoginForm.bind(this);
        this.postLoginDetails = this.postLoginDetails.bind(this);
    }

    submitLoginForm() {
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
            email: this.state.userEmail,
            password: this.state.userPassword
        }

        this.postLoginDetails(user);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.name === 'test' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value    
        });
    }

    postLoginDetails(user) {
        // POST request using fetch with error handling
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        fetch(API.login, requestOptions)
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
                    <Button 
                        positive
                        fluid
                        type='submit' 
                        loading={this.state.formLoading} 
                        disabled={!this.state.userEmail} 
                        onClick={this.submitLoginForm}
                    >Login</Button>
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

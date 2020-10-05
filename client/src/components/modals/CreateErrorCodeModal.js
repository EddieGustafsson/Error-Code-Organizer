import React, { Component } from 'react'
import { Modal, Button, Icon, Form, Message } from 'semantic-ui-react'
import API from "../../api/apiMap";

export default class CreateErrorCodeModal extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            modalOpen: false, 
            
            code: '',
            location: '',
            message: '',
            description: '',

            formLoading: false,
            formSuccess: false,

            codeError: false,
            locationError: false,
            descriptionError: false,
            messageError: false, 
            formError: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitErrorCodeForm = this.submitErrorCodeForm.bind(this);
        this.createErrorCode = this.createErrorCode.bind(this);
    }
  
    handleOpen = () => this.setState({ modalOpen: true })
  
    handleClose = () => this.setState({ modalOpen: false })

    handleInputChange(event) {
        const target = event.target;
        const value = target.name === 'test' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value    
        });
    }

    submitErrorCodeForm() {
        let error = false;

        this.setState({ formLoading: true });

        if (!this.state.code.replace(/\s/g, '').length) {
            this.setState({ codeError: true });
            error = true;
        } else {
            this.setState({ codeError: false });
        }

        if (error) {
            this.setState({ formError: true });
            return;
        }

        let errorcode = {
            project_id: this.props.projectId,
            code: this.state.code,
            location: this.state.location,
            message: this.state.message,
            description: this.state.description,
            last_updated_at: new Date(),
            created_at: new Date()
        }

        this.createErrorCode(errorcode);
    }

    createErrorCode(errorcode) {
        // POST request using fetch with error handling
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(errorcode)
        };
        fetch(API.error_code, requestOptions)
            .then(async response => {
                if(!response.ok) {
                    this.setState({ formError: true, formLoading: false });
                } else {
                    this.setState({ formError: false, formSuccess: true, formLoading: false });
                }
            })
            .catch(error => {
                this.setState({ formError: true, formLoading: false });
            });
    }

    render() {
        return (
            <Modal
                open={this.state.modalOpen}
                onClose={this.handleClose} 
                trigger={
                    <Button icon positive floated='right' labelPosition='left' onClick={this.handleOpen}>
                        <Icon name='add' />
                        Create error code
                    </Button>
                }>
                <Modal.Header>Create a error code</Modal.Header>
                <Modal.Content>
                    <Form error={this.state.formError} loading={this.state.formLoading}>
                        <Form.Field>
                            <Form.Input
                                label='Code' 
                                placeholder='0x80020019'
                                name='code'
                                value={this.state.code}
                                onChange={this.handleInputChange}
                                error={this.state.codeError}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                label='Location' 
                                placeholder='FileUpload'
                                name='location'
                                value={this.state.location}
                                onChange={this.handleInputChange}
                                error={this.state.locationError}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                label='Message' 
                                placeholder='Memory full'
                                name='message'
                                value={this.state.message}
                                onChange={this.handleInputChange}
                                error={this.state.messageError}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.TextArea 
                                label='Project description' 
                                placeholder='Description format' 
                                name='description'
                                value={this.state.description}
                                onChange={this.handleInputChange}
                                error={this.state.descriptionError}
                            />
                        </Form.Field>
                    </Form>
                    {this.state.formError 
                    ?
                    <Message 
                        error
                        header="Failed to create error code"
                        content="Something went wrong while creating your error code"
                    />
                    :
                    null
                    }
                    {this.state.formSuccess 
                    ?
                    <Message 
                        success
                        header="Error code created!"
                        content="The error code has been succesfully created"
                    />
                    :
                    null
                    }
                </Modal.Content>
                <Modal.Actions>
                    <Button positive type='submit' loading={this.state.formLoading} disabled={!this.state.code} onClick={this.submitErrorCodeForm}>Create error code</Button>
                    <Button basic onClick={this.handleClose} floated='right'>Cancel</Button>
                </Modal.Actions>
            </Modal>
        )
    }
  }

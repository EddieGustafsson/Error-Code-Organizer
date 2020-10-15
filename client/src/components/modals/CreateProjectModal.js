import React, { Component } from 'react'
import { Modal, Button, Icon, Form, Message } from 'semantic-ui-react'
import API from "../../api/apiMap";

export default class CreateProjectModal extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            modalOpen: false, 
            
            title: '', 
            description: '',

            formLoading: false,
            formSuccess: false,

            titleError: false,
            descriptionError: false, 
            formError: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitProjectForm = this.submitProjectForm.bind(this);
        this.createProject = this.createProject.bind(this);
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

    submitProjectForm() {
        let error = false;

        this.setState({ formLoading: true });

        if (!this.state.title.replace(/\s/g, '').length) {
            this.setState({ titleError: true });
            error = true;
        } else {
            this.setState({ titleError: false });
        }

        if (error) {
            this.setState({ formError: true });
            return;
        }

        let project = {
            title: this.state.title,
            description: this.state.description,
            date: new Date()
        }

        this.createProject(project);
    }

    createProject(project) {
        // POST request using fetch with error handling
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project)
        };
        fetch(API.project, requestOptions)
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
                        Create project
                    </Button>
                }>
                <Modal.Header>Create a project</Modal.Header>
                <Modal.Content>
                    <Form error={this.state.formError} loading={this.state.formLoading}>
                        <Form.Field>
                            <Form.Input
                                label='Project title' 
                                placeholder='My awsome project'
                                name='title'
                                value={this.state.title}
                                onChange={this.handleInputChange}
                                error={this.state.titleError}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.TextArea 
                                label='Project description (optional)' 
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
                        header="Failed to create project"
                        content="Something went wrong while creating your project"
                    />
                    :
                    null
                    }
                    {this.state.formSuccess 
                    ?
                    <Message 
                        success
                        header="Project created!"
                        content="The projects has been succesfully created"
                    />
                    :
                    null
                    }
                </Modal.Content>
                <Modal.Actions>
                    <Button positive type='submit' loading={this.state.formLoading} disabled={!this.state.title} onClick={this.submitProjectForm}>Create project</Button>
                    <Button basic onClick={this.handleClose} floated='right'>Cancel</Button>
                </Modal.Actions>
            </Modal>
        )
    }
  }

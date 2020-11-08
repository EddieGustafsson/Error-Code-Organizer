import React, { Component } from 'react'
import { Modal, Button, Icon, Form, Message } from 'semantic-ui-react'

import { connect } from 'react-redux';
import { createProject, getProjects } from '../../actions/projectActions';
import PropTypes from 'prop-types';

class CreateProjectModal extends Component {
    state = { 
        modalOpen: false, 
        
        title: '', 
        description: '',

        formLoading: false,
        formSuccess: false,

        titleError: false,
        descriptionError: false, 
        formError: false
    };

    handleOpen = () => this.setState({ modalOpen: true })
  
    handleClose = () => this.setState({ modalOpen: false })

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitProjectForm = (e) => {
        let error = false;
        e.preventDefault();

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

        this.props.createProject(project);
        this.props.getProjects(); //TODO: Need to fix delay
        this.setState({ formSuccess: true });
        this.setState({ formLoading: false });
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
                                onChange={this.onChange}
                                error={this.state.titleError}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.TextArea 
                                label='Project description (optional)' 
                                placeholder='Description format' 
                                name='description'
                                onChange={this.onChange}
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

const mapStateToProps = state => ({
    project: state.project
});

export default connect(mapStateToProps, { createProject, getProjects })(CreateProjectModal);
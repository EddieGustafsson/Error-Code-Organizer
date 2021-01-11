import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Modal, Button, Icon, Form, Message } from 'semantic-ui-react'
import { createErrorCode } from '../../actions/errorCodeActions';
import { getProject } from '../../actions/projectActions';
class CreateErrorCodeModal extends Component {
    state = {
        modalOpen: false,

        code: '',
        location: '',
        message: '',
        description: '',

        formLoading: false,
        formSuccess: false,
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitErrorCodeForm = (e) => {
        let error = false;
        e.preventDefault();

        this.setState({ formLoading: true });

        if (error) {
            this.setState({ formError: true });
            return;
        }

        let error_code = {
            project_id: this.props.projectId,
            code: this.state.code,
            location: this.state.location,
            message: this.state.message,
            description: this.state.description,
            last_updated_at: new Date(),
            created_at: new Date()
        }

        this.props.createErrorCode(error_code);
        this.props.getProject(this.props.projectId);
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
                                onChange={this.onChange}
                                error={this.state.codeError}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                label='Location'
                                placeholder='FileUpload'
                                name='location'
                                value={this.state.location}
                                onChange={this.onChange}
                                error={this.state.locationError}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                label='Message'
                                placeholder='Memory full'
                                name='message'
                                value={this.state.message}
                                onChange={this.onChange}
                                error={this.state.messageError}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.TextArea
                                label='Error code description'
                                placeholder='Description format'
                                name='description'
                                value={this.state.description}
                                onChange={this.onChange}
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

const mapStateToProps = state => ({
    project: state.project
});

export default connect(mapStateToProps, { createErrorCode, getProject })(CreateErrorCodeModal);
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, Button, Message } from 'semantic-ui-react'
import { deleteProject } from '../../actions/projectActions';

class RemoveProjectModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            formLoading: false,
            formSuccess: false,
            formError: false
        };
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitDeleteProject = (e) => {
        let error = false;
        e.preventDefault();

        this.setState({ formLoading: true });

        if (error) {
            this.setState({ formError: true });
            return;
        }

        this.props.deleteProject(this.props.projectId);
        this.setState({ formSuccess: true });
        this.setState({ formLoading: false });
    }

    render() {
        return (
            <Modal
                open={this.state.modalOpen}
                onClose={this.handleClose}
                size="small"
                trigger={
                    <Button color='red' onClick={this.handleOpen}>
                        Remove project
                    </Button>
                }>
                <Modal.Header>Remove project</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to permantly delete this project?</p>
                    {this.state.formError
                        ?
                        <Message
                            error
                            header="Failed to delete project"
                            content="Something went wrong while creating your project"
                        />
                        :
                        null
                    }
                    {this.state.formSuccess
                        ?
                        <Redirect
                            to={{
                                pathname: "/projects",
                                state: { referrer: "/project/" + this.props.projectId }
                            }}
                        />
                        :
                        null
                    }
                </Modal.Content>
                <Modal.Actions>
                    <Button positive type='submit' loading={this.state.formLoading} onClick={this.submitDeleteProject}>Yes</Button>
                    <Button basic onClick={this.handleClose} floated='right'>Cancel</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    project: state.project
});

export default connect(mapStateToProps, { deleteProject })(RemoveProjectModal);
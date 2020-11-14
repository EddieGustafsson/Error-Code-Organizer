import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { Modal, Button, Message } from 'semantic-ui-react'
import API from "../../api/apiMap";

export default class ExportProjectModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            formLoading: false,
            formSuccess: false,
            formError: false
        };

        this.removeProject = this.removeProject.bind(this);
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    removeProject() {
        // POST request using fetch with error handling
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(API.project + this.props.projectId, requestOptions)
            .then(async response => {
                if (!response.ok) {
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
                size="small"
                trigger={
                    <Button onClick={this.handleOpen}>
                        Export project
                    </Button>
                }>
                <Modal.Header>Export project</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to archive this export?</p>
                    {this.state.formError
                        ?
                        <Message
                            error
                            header="Failed to archive project"
                            content="Something went wrong while archiving your exporting"
                        />
                        :
                        null
                    }
                    {this.state.formSuccess
                        ?
                        <Redirect
                            to={{
                                pathname: "/projects/archive",
                                state: { referrer: "/project/" + this.props.projectId }
                            }}
                        />
                        :
                        null
                    }
                </Modal.Content>
                <Modal.Actions>
                    <Button positive type='submit' loading={this.state.formLoading} onClick={this.removeProject}>Yes</Button>
                    <Button basic onClick={this.handleClose} floated='right'>Cancel</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

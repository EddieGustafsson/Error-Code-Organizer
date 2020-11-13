import React, { Component } from 'react'
import { Form, Button, Message } from 'semantic-ui-react'
import API from "../../api/apiMap";
export default class ProjectSettingsForm extends Component {

    constructor(props) {
        super(props);

        this.state = {

            title: this.props.data.project.title,
            description: this.props.data.project.description,
            project_id: this.props.data.project._id,

            formLoading: false,
            formSuccess: false,

            titleError: false,
            descriptionError: false,
            formError: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitProjectSettingsForm = this.submitProjectSettingsForm.bind(this);
        this.patchProject = this.patchProject.bind(this);
    }

    submitProjectSettingsForm() {
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
            description: this.state.description
        }
        console.log(JSON.stringify(project));
        this.patchProject(project);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.name === 'test' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    patchProject(project) {
        // POST request using fetch with error handling
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project)
        };
        fetch(API.project + this.props.data.project._id, requestOptions)
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
            <div>
                <Form>
                    <Form.Group>
                        <Form.Input
                            label='Project name'
                            name='title'
                            width='10'
                            value={this.state.title}
                            onChange={this.handleInputChange}
                            error={this.state.titleError}
                        />
                        <Form.Input
                            label='Project ID'
                            name='_id'
                            value={this.state.project_id}
                            width='5'
                            readOnly
                        />
                    </Form.Group>
                    <Form.Field>
                        <Form.TextArea
                            label='Project description'
                            placeholder='Description format'
                            name='description'
                            width='15'
                            rows={6}
                            value={this.state.description}
                            onChange={this.handleInputChange}
                            error={this.state.descriptionError}
                        />
                    </Form.Field>
                    <Button
                        positive
                        type='submit'
                        loading={this.state.formLoading}
                        disabled={!this.state.title}
                        onClick={this.submitProjectSettingsForm}
                    >Save changes</Button>
                </Form>

                {this.state.formError
                    ?
                    <Message
                        error
                        header="Failed to save project"
                        content="Something went wrong while saving the changes to your project"
                    />
                    :
                    null
                }
                {this.state.formSuccess
                    ?
                    <Message
                        success
                        header="Project saved!"
                        content="The changes has been succesfully saved"
                    />
                    :
                    null
                }
            </div>
        )
    }
}

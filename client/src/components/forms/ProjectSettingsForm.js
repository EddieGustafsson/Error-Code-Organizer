import React, { Component } from 'react'
import { Form, Button, Message } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getProject, updateProject } from '../../actions/projectActions';
import { clearErrors } from '../../actions/errorActions';
import PropTypes from 'prop-types';

class ProjectSettingsForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.projectId,
            title: '',
            description: '',
    
            formLoading: false,
            formSuccess: false,
    
            errorMessage: null
        };
    }

    componentDidMount() {
        this.props.getProject(this.state.id);
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            this.setState({ errorMessage: error.message });
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submitProjectSettingsForm = (e) => {
        let error = false;
        this.props.clearErrors();
        e.preventDefault();

        this.setState({ formLoading: true });

        if (error) {
            this.setState({ formError: true });
            return;
        }

        const { title, description } = this.state;

        let project = {
            title,
            description,
        }

        this.props.updateProject(this.state.id, project);

        this.setState({ formSuccess: true });
        this.setState({ formLoading: false });

    }

    render() {

        // Loads project settings form skeleton when loading
        const loading = this.props.project.loading;
        if (this.props.project.project.length === 0 || loading) {
            return(
                <div>
                <Form loading>
                    <Form.Group>
                        <Form.Input
                            label='Project name'
                            name='title'
                            width='10'
                        />
                        <Form.Input
                            label='Project ID'
                            name='id'
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
                        />
                    </Form.Field>
                    <Button positive type='submit'>Save changes</Button>
                </Form>
            </div>
            )
        }

        // Default project settings form JSX
        return (
            <div>
                <Form>
                    <Form.Group>
                        <Form.Input
                            label='Project name'
                            name='title'
                            width='10'
                            value={this.state.title}
                            onChange={this.onChange}
                        />
                        <Form.Input
                            label='Project ID'
                            name='id'
                            value={this.state.id}
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
                            onChange={this.onChange}
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

                { this.state.errorMessage ? <Message header='Failed to update project' content={this.state.errorMessage} negative /> : null}
            </div>
        )
    }
}

ProjectSettingsForm.propTypes = {
    getProject: PropTypes.func.isRequired,
    updateProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired
}
  
const mapStateToProps = (state) => ({
    project: state.project,
    error: state.error
});
  
export default connect(mapStateToProps, { getProject, updateProject, clearErrors })(ProjectSettingsForm);

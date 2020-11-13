import React from 'react';
import Async from 'react-async';
import { Segment, Message, Button, Tab, Grid, Header } from 'semantic-ui-react';
import API from "../api/apiMap";
import ProjectSettingsForm from "../components/forms/ProjectSettingsForm";
import RemoveProjectModal from "../components/modals/RemoveProjectModal";
import ArchiveProjectModal from "../components/modals/ArchiveProjectModal";
import ExportProjectModal from "../components/modals/ExportProjectModal";

function ProjectSettings({ match }) {

    const fetchProject = () => fetch(API.project + match.params.id)
        .then(res => (res.ok ? res : Promise.reject))
        .then(res => res.json());

    const generalForm = [
        <Tab.Pane attached={false} style={{ minHeight: '50vh' }}>
            <Async promiseFn={fetchProject}>
                <Async.Fulfilled>
                    {data => {
                        return (
                            <ProjectSettingsForm data={data} />
                        )
                    }}
                </Async.Fulfilled>
                <Async.Rejected>
                    <Message
                        error
                        header='Could not fetch project'
                        content='Reload the page and try again.'
                    />
                </Async.Rejected>
            </Async>
        </Tab.Pane>
    ]

    const advancedForm = [
        <Tab.Pane attached={false} style={{ minHeight: '50vh' }}>
            <Message>
                <Header as='h3'>Export project</Header>
                <p>Export this project with all its related data in order to move your project to a new ECO instance.</p>
                <ExportProjectModal />
            </Message>
            <Message>
                <Header as='h3' color='orange'>Archive project</Header>
                <p>Archiving the project will make it entirely read only. It is hidden from the dashboard and doesn't show up in searches.</p>
                <ArchiveProjectModal projectId={match.params.id} />
            </Message>
            <Message>
                <Header as='h3' color='red'>Remove project</Header>
                <p>Once you remove a project, there is no going back. Please be certain. </p>
                <RemoveProjectModal projectId={match.params.id} />
            </Message>
        </Tab.Pane>
    ]

    const panes = [
        { menuItem: 'General', render: () => generalForm },
        { menuItem: 'Advanced', render: () => advancedForm },
    ]

    return (
        <div>
            <Segment vertical >
                <Grid>
                    <Grid.Column floated='left' width={5}>
                        <Header as='h2'>Project settings</Header>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment vertical>
                <Tab menu={{ fluid: true, vertical: true, pointing: true }} panes={panes} />
            </Segment>
        </div>
    );

}

export default ProjectSettings;

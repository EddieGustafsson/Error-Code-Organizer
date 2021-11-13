import React, { Component } from 'react';
import Avatar from 'react-avatar';
import ReactMarkdown from 'react-markdown';
import DataTable from 'react-data-table-component';
import ReactTimeAgo from 'react-time-ago';
import JavascriptTimeAgo from 'javascript-time-ago'

import { connect } from 'react-redux';
import { getProjects } from '../actions/projectsActions';
import PropTypes from 'prop-types';

import { Segment, Header, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import en from 'javascript-time-ago/locale/en';

import CreateProjectModal from '../components/modals/CreateProjectModal';

JavascriptTimeAgo.addLocale(en);

const columns = [
    {
        name: 'Title',
        selector: 'title',
        sortable: true,
        cell: row => <div><Avatar maxInitials='1' name={row.title} verticalAlign='middle' size='30px' round='5px' /><Link to={`/project/${row._id}`}> {row.title}</Link></div>,
    },
    {
        name: 'Last updated',
        selector: 'date',
        sortable: true,
        right: true,
        cell: row => <ReactTimeAgo date={row.last_updated_at} locale="en" />,
    },
];

const ExpandedComponent = ({ data }) => (
    <Segment vertical>
        <ReactMarkdown source={data.description} />
    </Segment>
);

class Projects extends Component {

    componentDidMount() {
        this.props.getProjects();
    }

    render() {
        const { projects } = this.props.projects.projects;
        return (
            <div>
                <Segment vertical>
                    <Grid>
                        <Grid.Column floated='left' width={5}>
                            <Header as='h2'>Projects</Header>
                        </Grid.Column>
                        <Grid.Column floated='right' width={5}>
                            <CreateProjectModal />
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment vertical>
                    <DataTable
                        columns={columns}
                        data={projects}
                        noHeader={true}
                        striped={true}
                        expandableRowsComponent={<ExpandedComponent />}
                        expandableRows
                        expandOnRowClicked
                        pagination
                    />
                </Segment>
            </div>
        );
    }
}

Projects.propTypes = {
    getProjects: PropTypes.func.isRequired,
    projects: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    projects: state.projects
});

export default connect(mapStateToProps, { getProjects })(Projects);

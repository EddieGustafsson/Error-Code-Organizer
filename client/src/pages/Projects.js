import React from 'react';
import Avatar from 'react-avatar';
import Async from 'react-async';
import ReactMarkdown from 'react-markdown';
import DataTable from 'react-data-table-component';
import ReactTimeAgo from 'react-time-ago';
import JavascriptTimeAgo from 'javascript-time-ago'

import { Item, Segment, Message, Header, Grid } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import en from 'javascript-time-ago/locale/en';
import API from "../api/apiMap";

import CreateProjectModal from '../components/modals/CreateProjectModal';

JavascriptTimeAgo.addLocale(en);

const fetchPosts = () => fetch(API.project)
                            .then(res => (res.ok ? res : Promise.reject))
                            .then(res => res.json());

const columns = [
    {
        name: 'Title',
        selector: 'title',
        sortable: true,
        cell: row => <div><Avatar maxInitials='1' name={row.title} verticalAlign='middle' size='30px' round='5px'/><Link to={`/project/${row._id}`}> {row.title}</Link></div>,
    },
    {
        name: 'Last updated at',
        selector: 'date',
        sortable: true,
        right: true,
        cell: row => <ReactTimeAgo date={row.last_updated_at} locale="en"/>,
    },
];

const ExpandedComponent = ({ data }) => (
    <Segment attached='bottom'>
        <ReactMarkdown source={data.description}/>
    </Segment>
);

function Projects() {
    return (
        <Async promiseFn={fetchPosts}>
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
            
            <Async.Loading>
            <Item.Group>
                <Segment loading vertical>
                    <br/>
                    <br/>
                    <br/>
                </Segment>
            </Item.Group>
            </Async.Loading>

            <Async.Fulfilled>
            {data => {
                return (
                    <div>
                        <Segment vertical>
                            <DataTable
                                columns={columns}
                                data={data.projects}
                                noHeader={true}
                                striped={true}
                                expandableRowsComponent={<ExpandedComponent/>}
                                expandableRows
                                expandOnRowClicked
                                pagination
                            />
                        </Segment>
                    </div>
                )
            }}
            </Async.Fulfilled>

            <Async.Rejected>
                <Message
                    error
                    header='Could not fetch projects'
                    content='Reload the page and try again.'
                />
            </Async.Rejected>
        </Async>
    );
}

export default Projects;

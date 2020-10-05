import React from 'react';
import Async from 'react-async';
import { Segment, Message, Tab, Feed, Grid, Icon } from 'semantic-ui-react';
import API from "../api/apiMap";

function ProjectActivity({match}) {

    const fetchProject = () => fetch(API.project + match.params.id)
                          .then(res => (res.ok ? res : Promise.reject))
                          .then(res => res.json());

    const panes = [
        {
            menuItem: 'All',
        render: () => <Tab.Pane vertical attached={false}>{all}</Tab.Pane>,
        },
        {
            menuItem: 'Create events',
            render: () => <Tab.Pane vertical attached={false}>Tab 2 Content</Tab.Pane>,
        },
        {
            menuItem: 'Updated events',
            render: () => <Tab.Pane vertical attached={false}>Tab 3 Content</Tab.Pane>,
        },
        {
            menuItem: 'Deletion events',
            render: () => <Tab.Pane vertical attached={false}>Tab 4 Content</Tab.Pane>,
        },
        {
            menuItem: 'Comments',
            render: () => <Tab.Pane vertical attached={false}>Tab 5 Content</Tab.Pane>,
        },
    ]

    const all = [
        <div>
            <Segment vertical>
                <Grid>
                    <Grid.Column floated='left' width={8}>
                        <Feed>
                            <Feed.Event>
                            <Feed.Label>
                                <Icon name='pencil' />
                            </Feed.Label>
                            <Feed.Content>
                                <Feed.Date><b>Eddie Gustafsson</b> @EddieGustafsson</Feed.Date>
                                <Feed.Summary>
                                Edited project description
                                </Feed.Summary>
                            </Feed.Content>
                            </Feed.Event>
                        </Feed>
                    </Grid.Column>
                    <Grid.Column floated='right' textAlign='right' width={3}>
                    2 months ago
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment vertical>
                <Grid>
                    <Grid.Column floated='left' width={8}>
                        <Feed>
                            <Feed.Event>
                            <Feed.Label>
                                <Icon name='add' color='green'/>
                            </Feed.Label>
                            <Feed.Content>
                                <Feed.Date><b>Eddie Gustafsson</b> @EddieGustafsson</Feed.Date>
                                <Feed.Summary>
                                Created project
                                </Feed.Summary>
                            </Feed.Content>
                            </Feed.Event>
                        </Feed>
                    </Grid.Column>
                    <Grid.Column floated='right' textAlign='right' width={3}>
                    2 months ago
                    </Grid.Column>
                </Grid>
            </Segment>
        </div>
    ]

  return (
    <Async promiseFn={fetchProject}>
        <Async.Loading>
          <Segment loading vertical>
            <br></br>
            <br></br>
          </Segment>
        </Async.Loading>

        <Async.Fulfilled>
          {data => {
            return (
                <div>
                    {[data].map(data=> (
                        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
                    ))}
                </div>
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
  );
}

export default ProjectActivity;

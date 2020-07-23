import React from 'react';
import Async from 'react-async';
import Moment from 'moment';
import Avatar from 'react-avatar';
import { Header, Segment, Message, Icon, Grid, List, Feed, Label } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';
import DataTable from 'react-data-table-component';

function Post({match}) {

  const fetchProject = () => fetch(`/v1/project/${match.params.id}`)
                          .then(res => (res.ok ? res : Promise.reject))
                          .then(res => res.json());
  const columns = [
    {
        name: 'Code',
        selector: 'code',
        sortable: true,
    },
    {
      name: 'Location',
      selector: 'location',
      sortable: true,
      cell: row => <Label basic as='a'>{row.location}</Label>,
    },
    {
      name: 'Message',
      selector: 'message',
      sortable: true,
    },
    {
      name: 'Description',
      selector: 'description',
      sortable: true,
    },
    {
        name: 'Last updated at',
        selector: 'last_updated_at',
        sortable: true,
        right: true,
        cell: row => Moment(row.date).format('YYYY-MM-DD, HH:MM'),
    },
  ];

  const codesData = [
    {
      _id: '5f10857ab05692345c9ddabk',
      project_id: '5f10857ab05692345c9ddabe',
      code: '0x80020018',
      location: 'AccountCreation',
      message: 'Invalid name. Enter a new name.',
      description: 'Test',
      last_updated_at: '2020-07-19',
      created_at: '2020-07-19'
    },
    {
      _id: '5f10857ab05692345c9ddabl',
      project_id: '5f10857ab05692345c9ddabe',
      code: '0x80020019',
      location: 'FileUpload',
      message: 'Memory full.',
      description: 'Test',
      last_updated_at: '2020-07-19',
      created_at: '2020-07-19'
    }
  ];

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
                  <div>
                    <Segment vertical>
                      {[data].map(data=> (
                        <Grid columns={2} verticalAlign='middle'>
                          <Grid.Row>
                            <Grid.Column width={1}>
                              <Avatar maxInitials='1' name={data.project.title} verticalAlign='middle' size='60px' round='5px'/>
                            </Grid.Column>
                            <Grid.Column>
                              <Header as='h3'>
                                <Header.Content>
                                  {data.project.title}
                                  <Header.Subheader>Project ID: {data.project._id}</Header.Subheader>
                                </Header.Content>
                              </Header>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                        ))}
                      <br/>

                      <List horizontal size='small'>
                        <List.Item>
                          <List.Content>
                            <Icon disabled name='exclamation triangle' /><b>2</b> Error codes
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                          <Icon disabled name='tag' /><b>0</b> Tags
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                          <Icon disabled name='calendar alternate outline' /><b>{Moment(data.project.date).format('YYYY-MM-DD')}</b>
                          </List.Content>
                        </List.Item>
                      </List>

                    </Segment>

                    <Message>
                      <Feed>
                        <Feed.Event>
                          <Feed.Label image='https://secure.gravatar.com/avatar/b22ea4f703aacb0d99a753c539c1097d?s=80&d=identicon' />
                          <Feed.Content>
                            <Feed.Date>3 days ago</Feed.Date>
                            <Feed.Summary><a>Eddie Gustafsson</a> created Error code</Feed.Summary>
                          </Feed.Content>
                        </Feed.Event>
                      </Feed>
                    </Message>

                    <Header as='h5' attached='top'>Error codes</Header>
                    <Segment attached='bottom'>
                      <DataTable
                            columns={columns}
                            data={codesData}
                            noHeader={true}
                            striped={true}
                            pagination
                        />
                    </Segment>

                    <Header as='h5' attached='top'>Description</Header>
                    <Segment attached='bottom'>
                      <ReactMarkdown source={data.project.description}/>
                    </Segment>

                  </div>
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

export default Post;
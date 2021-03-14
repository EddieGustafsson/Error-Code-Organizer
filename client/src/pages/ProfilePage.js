import React, { Component } from 'react';
import Moment from 'react-moment';
import { Segment, Tab, Button, List, Grid, Header, Card, Placeholder, Image } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { getProfile} from '../actions/profileActions';
import PropTypes from 'prop-types';

class ProfilePage extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        username: this.props.match.params.username
      }
    }
  
    componentDidMount() {
      this.props.getProfile(this.state.username);
    }
  
    render() {
        const { user } = this.props.profile;
        const authUser = this.props.auth.user;
        const loading = this.props.profile.loading;

        const panes = [
            {
              menuItem: 'Overview',
              render: () => <Tab.Pane attached={false} style={{ minHeight: '54vh' }}>Profile overview</Tab.Pane>,
            },
            {
              menuItem: 'Projects',
              render: () => <Tab.Pane attached={false} style={{ minHeight: '54vh' }}>Projects</Tab.Pane>,
            },
            {
              menuItem: 'Tab 3',
              render: () => <Tab.Pane attached={false} style={{ minHeight: '54vh' }}>Tab 3 Content</Tab.Pane>,
            },
        ]
          
        // Profile page loading skeleton 
        if (this.props.profile.user.length === 0 || loading) {
            return (
                <div>
                    <Segment vertical >
                        <Grid>
                            <Grid.Column floated='left' width={5}>
                                <Header as='h2'>Profile page</Header>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                    <Segment vertical>
                        <Grid divided='vertically'>
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <Card>
                                        <Placeholder>
                                            <Placeholder.Image square />
                                        </Placeholder>
                                        <Card.Content>
                                            <Card.Header>
                                                <Placeholder>
                                                    <Placeholder.Line length='very long' />
                                                </Placeholder>
                                            </Card.Header>
                                            <Card.Meta>
                                                <Placeholder>
                                                    <Placeholder.Line length='medium' />
                                                </Placeholder>
                                            </Card.Meta>
                                            <Card.Description>
                                                <Placeholder>
                                                    <Placeholder.Line length='full' />
                                                    <Placeholder.Line length='very long' />
                                                    <Placeholder.Line length='long' />
                                                </Placeholder>
                                            </Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <Placeholder>
                                                <Placeholder.Line length='full' />
                                                <Placeholder.Line length='very long' />
                                                <Placeholder.Line length='long' />
                                                <Placeholder.Line length='very long' />
                                            </Placeholder>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column width={12}>
                                    <Segment style={{ minHeight: '51vh' }} loading></Segment>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </div>
            )
        }

        return (
            <div>
                <Segment vertical >
                    <Grid>
                        <Grid.Column floated='left' width={5}>
                            <Header as='h2'>Profile page</Header>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment vertical>
                    <Grid divided='vertically'>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Card>
                                    <Image src='https://avatars.githubusercontent.com/u/55538121?s=460&v=4' wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Header>{user.name}</Card.Header>
                                        <Card.Meta>
                                            <span className='date'>@{user.username}</span>
                                        </Card.Meta>
                                        <Card.Description>
                                            { user.bio ? user.bio : null}
                                        </Card.Description>
                                    </Card.Content>
                                    { authUser.username === user.username ?
                                        <Card.Content extra>
                                            <Button primary fluid href={`/user/${user.username}/settings/`}>Edit your profile</Button>
                                        </Card.Content>
                                        : null
                                    }
                                    <Card.Content extra>
                                        <List>
                                            { user.location ? 
                                                <List.Item>
                                                    <List.Icon name='marker' />
                                                    <List.Content>{user.location}</List.Content>
                                                </List.Item>
                                                : null
                                            }

                                            <List.Item>
                                                <List.Icon name='mail' />
                                                <List.Content>
                                                    <a href={`mailto:${user.email}`}>{user.email}</a>
                                                </List.Content>
                                            </List.Item>

                                            { user.url ?
                                                <List.Item>
                                                    <List.Icon name='linkify' />
                                                    <List.Content>
                                                        <a href={user.url} target='_blank' rel="noreferrer">{user.url}</a>
                                                    </List.Content>
                                                </List.Item>
                                                : null
                                            }

                                            <List.Item>
                                                <List.Icon name='calendar alternate' />
                                                <List.Content>Member since <Moment date={user.created_at} format="YYYY-MM-DD"/></List.Content>
                                            </List.Item>
                                        </List>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <Tab menu={{ pointing: true }} panes={panes} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>
        );
    }
  
}
  
ProfilePage.propTypes = {
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfile })(ProfilePage);

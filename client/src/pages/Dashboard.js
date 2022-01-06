import React from 'react';
import { Grid, Segment, Header, Feed, Button, List } from 'semantic-ui-react';

class Dashboard extends React.Component {
  render() {

    const events = [
      {
        date: '1 Hour Ago',
        image: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
        meta: '4 Likes',
        summary: 'Elliot Fu added you as a friend',
      },
      {
        date: '4 days ago',
        image: 'https://react.semantic-ui.com/images/avatar/small/helen.jpg',
        meta: '1 Like',
        summary: 'Helen Troy added 2 new illustrations',
        extraImages: [
          'https://react.semantic-ui.com/images/wireframe/image.png',
          'https://react.semantic-ui.com/images/wireframe/image-text.png',
        ],
      },
      {
        date: '3 days ago',
        image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
        meta: '8 Likes',
        summary: 'Joe Henderson posted on his page',
        extraText:
          "Ours is a life of constant reruns. We're always circling back to where we'd we started.",
      },
      {
        date: '4 days ago',
        image: 'https://react.semantic-ui.com/images/avatar/small/justen.jpg',
        meta: '41 Likes',
        summary: 'Justen Kitsune added 2 new photos of you',
        extraText:
          'Look at these fun pics I found from a few years ago. Good times.',
        extraImages: [
          'https://react.semantic-ui.com/images/wireframe/image.png',
          'https://react.semantic-ui.com/images/wireframe/image-text.png',
        ],
      },
    ]

    return (
      <div>
        <Segment vertical>
          <Grid>
            <Grid.Column floated='left' width={5}>
              <Header as='h2'>Dashboard</Header>
            </Grid.Column>
            <Grid.Column floated='right' width={5}>

            </Grid.Column>
          </Grid>
        </Segment>
        <Segment vertical>
          <Grid>
            <Grid.Row>
              <Grid.Column width='5'>
                <Header as='h5' attached='top'>
                  Projects
                </Header>
                <Segment attached>
                  <List divided relaxed>
                    <List.Item>
                      <List.Icon name='folder outline' size='large' verticalAlign='middle' />
                      <List.Content>
                        <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
                        <List.Description as='a'>Updated 10 mins ago</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name='folder outline' size='large' verticalAlign='middle' />
                      <List.Content>
                        <List.Header as='a'>Semantic-Org/Semantic-UI-Docs</List.Header>
                        <List.Description as='a'>Updated 22 mins ago</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name='folder outline' size='large' verticalAlign='middle' />
                      <List.Content>
                        <List.Header as='a'>Semantic-Org/Semantic-UI-Meteor</List.Header>
                        <List.Description as='a'>Updated 34 mins ago</List.Description>
                      </List.Content>
                    </List.Item>
                  </List>
                </Segment>
              </Grid.Column>
              <Grid.Column width='11'>
                <Header as='h5' attached='top'>
                  All activities
                </Header>
                <Segment attached>
                  <Feed events={events} />
                  <Button fluid>Load more</Button>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }
}

export default Dashboard;

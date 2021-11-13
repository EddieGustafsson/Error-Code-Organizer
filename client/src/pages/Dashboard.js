import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';

class Dashboard extends React.Component {
  render() {
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
          <br />
          <br />
          <br />
        </Segment>
      </div>
    )
  }
}

export default Dashboard;

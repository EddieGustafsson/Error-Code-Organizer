import React, { Component } from 'react';
import Moment from 'moment';
import Avatar from 'react-avatar';
import { Header, Segment, Message, Icon, Grid, List, Feed, Placeholder } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';
import ErrorCodesTable from '../components/tables/ErrorCodesTable';

import { connect } from 'react-redux';
import { getProject } from '../actions/projectActions';
import PropTypes from 'prop-types';

class Project extends Component {

  constructor(props){
    super(props);

    this.state = {
        id : this.props.match.params.id
    }
  }

  componentDidMount() {
      this.props.getProject(this.state.id);
  }

  render() {
    const { project } = this.props.project.project;
    const loading = this.props.project.loading;

    if (this.props.project.project.length === 0 || loading) {
      return(
        <div>
          <Segment vertical>
              <Grid columns={2} verticalAlign='middle'>
                <Grid.Row>
                  <Grid.Column>
                    <Placeholder>
                      <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                      </Placeholder.Header>
                    </Placeholder>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            <br/>
    
            <Placeholder>
              <Placeholder.Line />
            </Placeholder>
    
          </Segment>
  
          <Message>
            <Placeholder>
              <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
            </Placeholder>
          </Message>
  
          <Header as='h5' attached='top'>Error codes</Header>
          <Segment attached='bottom' loading>
            <ErrorCodesTable />
          </Segment>
  
          <Header as='h5' attached='top'>Description</Header>
          <Segment attached='bottom'>
            <Placeholder>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder>
          </Segment>
        </div>
      )
    }

    return (
      <div>
        <Segment vertical>
            <Grid columns={2} verticalAlign='middle'>
              <Grid.Row>
                <Grid.Column width={1}>
                  <Avatar maxInitials='1' name={project.title} verticalAlign='middle' size='60px' round='5px'/>
                </Grid.Column>
                <Grid.Column>
                  <Header as='h3'>
                    <Header.Content>
                      {project.title}
                      <Header.Subheader>Project ID: {project._id}</Header.Subheader>
                    </Header.Content>
                  </Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          <br/>
  
          <List horizontal size='small'>
            <List.Item>
              <List.Content>
                <Icon disabled name='exclamation triangle' /><b>{project.error_codes.length}</b> Error codes
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
              <Icon disabled name='tag' /><b>0</b> Tags
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
              <Icon disabled name='calendar alternate outline' /><b>{Moment(project.created_at).format('YYYY-MM-DD')}</b>
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
                <Feed.Summary><a href='/profile/eddiegustafsson'>Eddie Gustafsson</a> created Error code</Feed.Summary>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Message>
  
        <Header as='h5' attached='top'>Error codes</Header>
        <Segment attached='bottom'>
          <ErrorCodesTable projectId={project._id} errorCodeData={project.error_codes} />
        </Segment>
  
        <Header as='h5' attached='top'>Description</Header>
        <Segment attached='bottom'>
          <ReactMarkdown source={project.description}/>
        </Segment>
      </div>
    );

  }

}

Project.propTypes = {
  getProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  project: state.project
});

export default connect(mapStateToProps, { getProject })(Project);

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getProject } from '../actions/projectActions';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar'
import { NavLink } from 'react-router-dom'
import { Accordion, Menu, Segment, Placeholder } from 'semantic-ui-react'

class ProjectSidebar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      activeIndex: 0
    }
  }

  componentDidMount() {
    this.props.getProject(this.state.id);
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state;
    const { project } = this.props.project.project;
    const loading = this.props.project.loading;

    const ProjectOverview = (
      <Menu secondary vertical style={{ width: '100%' }}>
        <Menu.Item name='Details' as={NavLink} activeClassName="active" exact to={`/project/${this.state.id}`} />
        <Menu.Item name='Activity' as={NavLink} activeClassName="active" exact to={`/project/${this.state.id}/activity`} />
      </Menu>
    )

    if (this.props.project.project.length === 0 || loading) {
      return (
        <div>
          <Segment attached>
            <Accordion as={Menu} vertical secondary>

              <Menu.Item header align>
                <Placeholder>
                  <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                </Placeholder>
              </Menu.Item>

              <Menu.Item active={activeIndex === 0}>
                <Accordion.Title
                  icon='home'
                  active={activeIndex === 0}
                  content='Project overview'
                  index={0}
                  onClick={this.handleClick}
                />
                <Accordion.Content active={activeIndex === 0} content={ProjectOverview} />
              </Menu.Item>

              <Menu.Item as={NavLink} activeClassName="active" exact to={`/project/${this.state.id}/settings`}>
                <Accordion.Title
                  icon='settings'
                  active={activeIndex === 1}
                  content='Settings'
                  index={1}
                  onClick={this.handleClick}
                />
              </Menu.Item>

            </Accordion>
          </Segment>
        </div>
      )
    }

    return (
      <Segment>
        <Accordion as={Menu} vertical secondary>

          <Menu.Item header align>
            <Avatar maxInitials='1' name={project.title} verticalAlign='middle' size='35px' round='5px' />{'  '}
            <span>{project.title}</span>
          </Menu.Item>

          <Menu.Item active={activeIndex === 0}>
            <Accordion.Title
              icon='home'
              active={activeIndex === 0}
              content='Project overview'
              index={0}
              onClick={this.handleClick}
            />
            <Accordion.Content active={activeIndex === 0} content={ProjectOverview} />
          </Menu.Item>

          <Menu.Item as={NavLink} activeClassName="active" exact to={`/project/${this.state.id}/settings`}>
            <Accordion.Title
              icon='settings'
              active={activeIndex === 1}
              content='Settings'
              index={1}
              onClick={this.handleClick}
            />
          </Menu.Item>

        </Accordion>
      </Segment>
    )
  }
}

ProjectSidebar.propTypes = {
  getProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  project: state.project
});

export default connect(mapStateToProps, { getProject })(ProjectSidebar);
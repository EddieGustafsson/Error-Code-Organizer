import React, { Component } from 'react'
import Async from 'react-async'
import Avatar from 'react-avatar'
import { NavLink } from 'react-router-dom'
import { Accordion, Menu, Segment, Message } from 'semantic-ui-react'
import API from "../api/apiMap";

export default class ProjectSidebar extends Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state;
    const projectId = this.props.match.params.id;

    const fetchProject = () => fetch(API.project + projectId)
                  .then(res => (res.ok ? res : Promise.reject))
                  .then(res => res.json());
    
    const ProjectOverview = (
      <Menu secondary vertical style={{width: '100%'}}>
          <Menu.Item name='Details' as={NavLink} activeClassName="active" exact to={`/project/${projectId}`}/>
          <Menu.Item name='Activity' as={NavLink} activeClassName="active" exact to={`/project/${projectId}/activity`}/>
      </Menu>
    )

    return (
    <Async promiseFn={fetchProject}>
      <Async.Fulfilled>

        {data => {
          return (
            <Segment style={{minHeight: '100%'}}>
              <Accordion as={Menu} vertical secondary>

                {[data].map(data=> (
                  <Menu.Item header align>
                    <Avatar maxInitials='1' name={data.project.title} verticalAlign='middle' size='35px' round='5px'/>{'  '}
                    <span>{data.project.title}</span>
                  </Menu.Item>
                ))}

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

                <Menu.Item as={NavLink} activeClassName="active" exact to={`/project/${projectId}/settings`}>
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
    )
  }
}
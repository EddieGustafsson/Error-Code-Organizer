import React, { Component } from 'react';
import { Menu, Segment, Input, Dropdown, Icon } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import { logout } from '../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; 

class Navbar extends Component {

  static propTypes = {
    logout: PropTypes.func.isRequired
  }

  render() {
    return (
      <Segment inverted raised color='violet' attached='bottom'>
        <Menu inverted fluid secondary>
          <Menu.Item name='eco'>
              <Icon name='file code' color='white' size='big' />
              ECO
          </Menu.Item>

          <Menu.Item as={NavLink} activeClassName="active" exact to='/' name='dashboard'>Dashboard</Menu.Item>
          <Menu.Item as={NavLink} activeClassName="active" to='/projects' name='projects'>Projects</Menu.Item>

          <Dropdown item text='More'>
            <Dropdown.Menu>
              <Dropdown.Item>Test1</Dropdown.Item>
              <Dropdown.Item>Test2</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Menu position='right'>
            <Dropdown item text="New">
              <Dropdown.Menu>
                <Dropdown.Item>New project</Dropdown.Item>
                <Dropdown.Item>Test 2</Dropdown.Item>
                <Dropdown.Item>Test 3</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Item name='logout'onClick={ this.props.logout }/>
          </Menu.Menu>
        </Menu>
      </Segment>
    );
  }
}

export default connect(null, { logout })(Navbar);

import React, { Component } from 'react';
import { Menu, Segment, Input, Dropdown, Icon } from 'semantic-ui-react';
import CreateProjectModal from '../components/modals/CreateProjectModal';
import { NavLink } from 'react-router-dom';
import { logout } from '../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';

class Navbar extends Component {

  render() {
    const { user } = this.props.auth;

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
                <CreateProjectModal dropdownItem={true} />
              </Dropdown.Menu>
            </Dropdown>

            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>

            <Dropdown item text='Help'>
              <Dropdown.Menu>
                <Dropdown.Item>Documentation</Dropdown.Item>
                <Dropdown.Item>Keyboard shortcuts</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href='https://github.com/EddieGustafsson/Error-Code-Organizer/issues/new/choose' target='_blank'>Submit feedback</Dropdown.Item>
                <Dropdown.Item href='https://github.com/EddieGustafsson/Error-Code-Organizer' target='_blank'>Contribute to ECO</Dropdown.Item>
                <Dropdown.Item href='https://github.com/EddieGustafsson/Error-Code-Organizer/releases' target='_blank'>Updates and releases</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown item text={<Avatar maxInitials='1' name={user.name}size='30px' round='5px' />}>
              <Dropdown.Menu>
                <Dropdown.Header content={user.name} />
                <Dropdown.Item disabled>{user.email}</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as={NavLink} activeClassName="active" to={`/user/${user._id}`}>Profile</Dropdown.Item>
                <Dropdown.Item as={NavLink} activeClassName="active" to={`/user/${user._id}/settings`}>Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={this.props.logout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </Menu.Menu>
        </Menu>
      </Segment>
    );
  }
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);

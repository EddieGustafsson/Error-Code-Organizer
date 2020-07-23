import React from 'react';
import { Menu, Segment, Input, Dropdown, Image } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import Logo from '../ECO-logo.png'

function Navbar() {
      return (
        <Segment inverted raised color='violet' attached='bottom'>
          <Menu inverted fluid secondary>
            <Image src={Logo} width='5%' height='5%'></Image>

            <Menu.Item as={NavLink} activeClassName="active" exact to='/' name='dashboard'>Dashboard</Menu.Item>
            <Menu.Item as={NavLink} activeClassName="active" to='/projects' name='projects'>Projects</Menu.Item>

            <Dropdown item text='More'>
              <Dropdown.Menu>
                <Dropdown.Item>Electronics</Dropdown.Item>
                <Dropdown.Item>Automotive</Dropdown.Item>
                <Dropdown.Item>Home</Dropdown.Item>
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
              <Menu.Item name='logout'/>
            </Menu.Menu>
          </Menu>
        </Segment>
      );
}

export default Navbar;

import React from 'react';
import { Menu, Icon } from 'semantic-ui-react'

function SmallNavbar() {
  return (
    <Menu fluid widths={1}>
      <Menu.Item name='eco'>
        <Icon name='file code' color='violet' size='large' />
      </Menu.Item>
    </Menu>
  );
}

export default SmallNavbar;

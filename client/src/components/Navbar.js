import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

class Navbar extends Component { 

  render() {
    return(
      <Menu>
        <Menu.Item header>Green Charge</Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item name="Home" as={NavLink} to="/" />
          {this.props.authenticated &&
          <Menu.Item name="Sign Out" as={NavLink} to="/signout" />
          }
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Navbar;
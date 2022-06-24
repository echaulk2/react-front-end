import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { Menu, Button, Drawer, Dropdown } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { AccountContext } from './Account';

const Navbar = () => {
  const { getSession, userStatus, userSetStatus, currentUser } = useContext(AccountContext);

  useEffect(() => {
      getSession();
  }, [userStatus]);

  return (
    <Menu className="main-navbar">
      <Menu.Item key={1} style={{float:'right'}}>
        { userStatus ? `Hello, ${currentUser().getUsername()}` : "Please login" }
      </Menu.Item>
    </Menu>
  )
}

export default Navbar
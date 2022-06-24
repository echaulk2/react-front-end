import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { Menu } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { AccountContext } from './Account';

const Navbar = () => {
  const { getSession, userStatus, userSetStatus, currentUser } = useContext(AccountContext);

  useEffect(() => {
    getSession().then((session: any) => {
        console.log("Session: ", session);
        userSetStatus(true);
    }).catch((err: any) => {})
  }, []);   

  return (
    <Menu className="main-navbar">
      <Menu.Item key={1} style={{float:'right'}}>
        { userStatus ? `Hello, ${currentUser().getUsername()}` : "Please login" }
      </Menu.Item>
    </Menu>
  )
}

export default Navbar
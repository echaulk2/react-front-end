import { Menu, Button, Drawer, Dropdown } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { AccountContext } from './Account';
import Status from './Status';

const Navbar = () => {
  const { getSession, userStatus, userSetStatus } = useContext(AccountContext);

  useEffect(() => {
      getSession().then((session: any) => {
          if (session) {
            console.log("Session: ", session);
            userSetStatus(true);
          } else {
            userSetStatus(false);
          }
      })
  }, []);

  return (
    <Menu className="main-navbar">
      <Menu.Item style={{float:'right'}}>
        <Status />
      </Menu.Item>
    </Menu>
  )
}

export default Navbar
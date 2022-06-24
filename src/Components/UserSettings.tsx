import { Button } from 'antd';
import React, { useEffect, useContext, useState } from 'react'
import { AccountContext } from './Account'
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';

export default () => {
    const { getSession, logout, currentUser } = useContext(AccountContext);

    useEffect(() => {
        getSession();
    }, []);
  return (
    <div>{currentUser && (
        <div id="login-form-container" className="form-container">
            <h1>Hello, {currentUser().getUsername()}</h1>            
            <ChangeEmail />
            <ChangePassword />
            <Button onClick={ logout } type="primary" htmlType="submit">Logout</Button>
        </div>
    )}
    </div>
  )
}
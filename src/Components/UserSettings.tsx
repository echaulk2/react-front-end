import { Button } from 'antd';
import React, { useEffect, useContext, useState } from 'react'
import { AccountContext } from './Account'
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';

export default () => {
    const { getSession, logout, userSetStatus, currentUser } = useContext(AccountContext);

    useEffect(() => {
        getSession().then((session: any) => {
            console.log("Session: ", session);
            userSetStatus(true);
        }).catch((err: any) => {})
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
import { Button, Menu } from 'antd';
import React, { useState, useContext, useEffect} from 'react'
import { AccountContext } from "./Account";

const Status = () => {    
    const { getSession, logout, userStatus, userSetStatus } = useContext(AccountContext);
    
    useEffect(() => {   
        getSession()
        .then((session: any) => {
            session && userSetStatus(true);
        }).catch((e: any) => {
            console.log(e);
        });
    });
    
    return <div>{ userStatus ? <Button onClick={ logout } type="primary" htmlType="submit">Logout</Button> : <Button type="primary" htmlType="submit">Login</Button>}</div>;
};

export default Status;
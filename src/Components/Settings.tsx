import React, { useEffect, useContext, useState } from 'react'
import { AccountContext } from './Account'
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';

export default () => {
    const { getSession } = useContext(AccountContext);
    const [loggedin, setLoggedIn] = useState(false);

    useEffect(() => {
        getSession().then(() => {
            setLoggedIn(true);
        }).catch((err: any) => {})
    }, []);
  return (
    <div>{loggedin && (
        <>
            <h2>Settings</h2>
            <ChangePassword />
            <ChangeEmail />
        </>
    )}
    </div>
  )
}
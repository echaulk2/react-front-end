import React, { useContext } from 'react'
import Signup from './Signup'
import Login from './Login'
import { AccountContext } from './Account'
import Navbar from './Navbar'
import UserSettings from './UserSettings'

const Home = () => {
    const { userStatus } = useContext(AccountContext);

    return (
        <>
            <Navbar />
            { userStatus ? <UserSettings /> : <div> <Login /> <Signup /> </div> }
        </>
    )
}

export default Home
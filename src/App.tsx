import React from 'react'
import Signup from './Components/Signup'
import Login from './Components/Login'
import { Account } from './Components/Account'
import Status from './Components/Status'
import Settings from './Components/Settings'
import Navbar from './Components/Navbar'

function App() {
  return (
    <Account>
        <Navbar />
        <Signup />
        <Login />
    </Account>
  )
}

export default App
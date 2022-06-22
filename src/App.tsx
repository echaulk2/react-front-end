import React from 'react'
import Signup from './Components/Signup'
import Login from './Components/Login'
import { Account } from './Components/Account'
import Status from './Components/Status'
import Settings from './Components/Settings'
function App() {
  return (
    <Account>
        <Status />
        <Signup />
        <Login />
        <Settings />
    </Account>
  )
}

export default App
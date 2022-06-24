import React, { useContext, useEffect } from 'react'
import Signup from './Components/Signup'
import Login from './Components/Login'
import { Account, AccountContext } from './Components/Account'
import Home from './Components/Home'

function App() {
  return (
    <Account>
        <Home />
    </Account>
  )
}

export default App
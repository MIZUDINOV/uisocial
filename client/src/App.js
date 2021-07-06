import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { AuthContext } from './contextStore/AuthContext'

import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'
import Register from './pages/register/Register'

function App() {
  const { user } = React.useContext(AuthContext)

  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          {user ? <Home /> : <Redirect to='/login' />}
        </Route>
        <Route path='/login' exact>
          {user ? <Redirect to='/' /> : <Login />}
        </Route>
        <Route path='/register' exact>
          <Register />
        </Route>
        <Route path='/profile/:username'>
          <Profile />
        </Route>
      </Switch>
    </Router>
  )
}

export default App

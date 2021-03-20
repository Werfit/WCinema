import React, { useEffect } from 'react'

import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loadUser } from 'actions/auth'

import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/Registration'

const App = () => {
  const dsp = useDispatch()
  useEffect(() => dsp(loadUser()), [])

  return (
    <Router className='container-fluid'>
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route exact path='/registration' component={ Registration } />
        <Route exact path='/login' component={ Login } />
      </Switch>
    </Router>
  )
}

export default App

import React, { useEffect } from 'react'

import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loadUser } from 'actions/auth'

import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Movie from './pages/Movie'

const App = () => {
  const dsp = useDispatch()
  useEffect(() => dsp(loadUser()), [])

  return (
    <Router className='container-fluid'>
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route exact path='/register' component={ Registration } />
        <Route exact path='/login' component={ Login } />
        <Route exact path='/movie/:name' component={ Movie } />
      </Switch>
    </Router>
  )
}

export default App

import React, { useEffect } from 'react'

import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loadUser } from 'actions/auth'

import Home from './pages/Home'

import Login from './pages/Login'
import Registration from './pages/Registration'

import Movie from './pages/Movie'

import NewMovie from './pages/NewMovie'
import NewHall from './pages/NewHall'
import NewSession from './pages/NewSession'

import Buy from './pages/Buy'

const App = () => {
  const dsp = useDispatch()
  useEffect(() => dsp(loadUser()), [])

  return (
    <Router className='container-fluid'>
      <Switch>
        <Route exact path='/' component={ Home } />

        {/* AUTH */}
        <Route exact path='/register' component={ Registration } />
        <Route exact path='/login' component={ Login } />

        {/* MOVIES */}
        <Route exact path='/movie/:name' component={ Movie } />

        {/* ADD */}
        <Route exact path='/add/movie' component={ NewMovie } />
        <Route exact path='/add/hall' component={ NewHall } />
        <Route exact path='/add/session' component={ NewSession } />

        {/* TICKETS */}
        <Route exact path='/:id/buy_tickets' component={ Buy } />
      </Switch>
    </Router>
  )
}

export default App

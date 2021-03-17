import React from 'react'

import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'

const App = () => {
  return (
    <Router className='container-fluid'>
      <Switch>
        <Route exact path='/' component={ Home } />
      </Switch>
    </Router>
  )
}

export default App

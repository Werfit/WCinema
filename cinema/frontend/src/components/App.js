import React from 'react'

import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Navigation from './layout/Navigation'
import MovieList from './movies/MovieList'

const Home = () => {
  return (
    <>
      <Navigation />

      <div className="container mt-4">
        <MovieList />
      </div>
    </>
  )
}

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

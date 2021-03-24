import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getMovies } from 'actions/movies'

import Navigation from '../layout/Navigation'
import MovieList from '../movies/MovieList'

const Home = () => {
  const dsp = useDispatch()
  useEffect(() => dsp(getMovies()), [])

  return (
    <div className="container wcinema-container mt-4">
      <MovieList />
    </div>
  )
}

export default Home
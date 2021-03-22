import React, { useEffect, lazy, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMovie } from 'actions/movies'

import Navigation from '../layout/Navigation'
// import Movie from 

const MoviePage = ({ match }) => {
  const dsp = useDispatch()
  const { isLoading, currentMovie} = useSelector(state => state.movies)

  useEffect(() => dsp(getMovie(match.params.name)), [])
  const Movie = lazy(() => import('../movies/Movie'))

  return (
    <div>
      <Navigation />
      <Suspense fallback={ <div>Loading...</div> }>
        { !isLoading && <Movie movie={ currentMovie } detail={ true } /> }
      </Suspense>
    </div>
  )
}

export default MoviePage

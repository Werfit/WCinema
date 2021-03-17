import React from 'react'
import Movie from './Movie'

import { useSelector, useDispatch } from 'react-redux'
import { getMovies } from 'actions/movies'

const MovieList = () => {
  const movies = useSelector(state => state.movies.sessions)
  const dsp = useDispatch()

  const filterMovies = (e, day) => {
    e.preventDefault()

    dsp(getMovies(day))
  }

  return (
    <div className='movie_list'>
      <div className="buttons mb-2">
        <button className="btn btn-secondary" onClick={ e => filterMovies(e, 'today') }>Today</button>
        <button className="btn btn-secondary" onClick={ e => filterMovies(e, 'tomorrow') } >Tomorrow</button>
      </div>

      {
        movies.map((movie) => <Movie key={ movie.id } movie={ movie } />)
      }
    </div>
  )
}

export default MovieList

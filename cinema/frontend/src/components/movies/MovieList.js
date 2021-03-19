import React, { useState } from 'react'
import Movie from './Movie'

import { useSelector, useDispatch } from 'react-redux'
import { getMovies } from 'actions/movies'

const MovieList = () => {
  const movies = useSelector(state => state.movies.sessions)
  const dsp = useDispatch()

  const [chosenFilter, setChosenFilter] = useState(0)

  const filterMovies = (e, day='today') => {
    e.preventDefault()

    dsp(getMovies(day))

    setChosenFilter(day === 'today' ? 0 : day === 'all' ? -1 : 1)
  }

  return (
    <div className='movie_list'>
        <div className="filter-buttons mb-4 mt-5">
          <div className="filter-button-main mb-2">
            <button className="btn btn-outline-secondary" disabled={ chosenFilter === 0 } onClick={ e => filterMovies(e) }>Today</button>
            <button className="btn btn-outline-secondary" disabled={ chosenFilter === 1 } onClick={ e => filterMovies(e, 'tomorrow') } >Tomorrow</button>
          </div>
          <div className="filter-button-secondary">
            <button className="btn btn-outline-secondary" disabled={ chosenFilter === -1 } onClick={ e => filterMovies(e, 'all') }>All</button>
          </div>
        </div>

      {
        movies.map((movie) => <Movie key={ movie.id } movie={ movie } />)
      }
    </div>
  )
}

export default MovieList

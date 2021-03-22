import React, { useState, Suspense, lazy } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { getMovies } from 'actions/movies'

const MovieList = () => {
  const { list: movies, isLoading } = useSelector(state => state.movies)
  const dsp = useDispatch()

  const [chosenFilter, setChosenFilter] = useState(0)

  const Movie = lazy(() => import('./Movie'))

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

      <Suspense fallback={ <div>Loading...</div> }>
        {
          !isLoading && movies.map((movie) => <Movie key={ movie.id } movie={ movie } />)
        }
      </Suspense>
    </div>
  )
}

export default MovieList

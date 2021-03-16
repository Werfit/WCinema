import React from 'react'
import Movie from './Movie'

import { useSelector } from 'react-redux'

const MovieList = () => {
  const movies = useSelector(state => state.movies.sessions)

  return (
    <div className='movie_list'>
      {
        movies.map((movie) => <Movie key={ movie.id } movie={ movie } />)
      }
    </div>
  )
}

export default MovieList

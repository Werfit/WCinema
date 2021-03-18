import React from 'react'
import moment from 'moment'

const Movie = ({ movie }) => {
  return (
    <div className='card card-body mb-4'>
      <h3 className='card-title mb-2'>
      { movie.name }
      </h3>
      <div className='card-text'>
        { movie.description }
        { !movie.description && 'No description' }
      </div>
      <div className='list-group list-group-flush mt-3'>
        {
          movie.sessions.map(session => (
            <span key={ session.id } className='list-group-item'>
              { moment(session.start).format('MMMM DD') } at { moment(session.start).format('hh:mm') }
            </span>
          ))
        }
      </div>
    </div>
  )
}

export default Movie

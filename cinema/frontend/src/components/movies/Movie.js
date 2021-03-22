import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Movie = ({ movie, detail }) => {
  console.log(`/movie/${movie.name}`)
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
          movie.sessions.length !== 0 ? movie.sessions.map(session => (
            <span key={ session.id } className='list-group-item list-group-item-action session-info'>
              <span>{ moment(session.start).format('MMMM DD') } at { moment(session.start).format('HH:mm') }</span>
              <span className='outline-cyan'>${ session.price }</span>
            </span>
          )) : <span className='list-group-item'>No sessions today</span>
        }
      </div>
      {
        detail && (
          <div className='mt-3'>
            <button className='btn btn-outline-primary'>Book</button>
          </div>
        )
      }
      {
        !detail && <Link className='btn btn-outline-info mt-3' to={ `/movie/${ movie.name }` }>More</Link>
      }
    </div>
  )
}

export default Movie

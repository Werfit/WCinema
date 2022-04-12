import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Movie = ({ movie, detail }) => {
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
              { 
                !detail ? <span className='outline-cyan'>${ session.price }</span> : (
                  <Link to={ `/${session.id}/buy_tickets` } className='btn btn-outline-primary' >Book</Link>
                )
              }
            </span>
          )) : <span className='list-group-item'>No session today</span>
        }
      </div>
      {
        !detail && <Link className='btn btn-outline-info mt-3' to={ `/movie/${ movie.name }` }>More</Link>
      }
    </div>
  )
}

export default Movie

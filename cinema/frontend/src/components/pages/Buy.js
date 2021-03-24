import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loadSession, buyTicket } from 'actions/movies'

import Navigation from '../layout/Navigation'

const Buy = ({ match }) => {
  const { isAuth, user } = useSelector(state => state.auth)
  const { session } = useSelector(state => state.movies)
  const [place, setPlace] = useState(0)

  const dsp = useDispatch()

  useEffect(() => { 
    dsp(loadSession(match.params.id))
  }, [])

  const ticket = e => {
    e.preventDefault()

    dsp(buyTicket({ session_id: session.id, place }))
  }

  // isAuth && !user.isStaff ?

  return session ?  (
    <div>
      <Navigation />

      <div className='container mt-4 wcinema-container'>
        <div className="mb-3">
          <label htmlFor="place" className="form-label">Place:</label>
          <input type="number" id="place" className="form-control" min="0"
            value={ place } onChange={ e => setPlace(e.target.value) }
          />
          <div className="form-text">Places range 0 - { session.size }</div>
          <div className="form-text">There are { session.size - session.tickets_bought } places left</div>
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label" >Price:</label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input type="number" id="price" value={ session.price } className="form-control" disabled />
          </div>
        </div>
        <button type="button" className="btn btn-outline-primary btn-lg mb-3" onClick={ e => ticket(e) }>Publish</button>
      </div>
    </div>
  ) : <div>Loading...</div>

  // <Redirect to='/' />
}

export default Buy

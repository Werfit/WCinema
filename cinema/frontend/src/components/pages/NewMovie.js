import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { publishMovie } from 'actions/admin'

import Navigation from '../layout/Navigation'

const NewMovie = () => {
  const [name, setName] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [description, setDescription] = useState('')

  const { isAuth: isAuthenticated, user } = useSelector(state => state.auth)
  const dsp = useDispatch()

  const publish = e => {
    e.preventDefault()

    dsp(publishMovie({ name, start_day: start, end_day: end, description }))
  }

  return (isAuthenticated && user.isStaff) ? (
    <div>
      <Navigation />

      <div className="container mt-4 wcinema-container">
        <div className="input-group mb-3">
          <input 
            type="text" className="form-control" placeholder="Name" aria-label="Name" aria-describedby="basic-addon1"
            value={ name } onChange={ e => setName(e.target.value) }
          />
        </div>

        <div className="input-group mb-3">
          <input
            type="date" placeholder='' className="form-control"
            value={ start }  onChange={ e => setStart(e.target.value) }
          />
        </div>
      
        <div className="input-group mb-3">
          <input
            type="date" placeholder='' className="form-control"
            value={ end }  onChange={ e => setEnd(e.target.value) }
          />
        </div>

        <div className="input-group mb-3">
          <textarea className="form-control" id="" cols="30" rows="10" placeholder='Description'
            value={ description } onChange={ e => setDescription(e.target.value) } 
          />
        </div>

        <button type="button" className="btn btn-outline-primary btn-lg mb-3" onClick={ e => publish(e) }>Publish</button>
      </div>
    </div>
  ) : <Redirect to='/' />
}

export default NewMovie

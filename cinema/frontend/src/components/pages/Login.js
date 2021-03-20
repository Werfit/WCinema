import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from 'actions/auth'

import Navigation from '../layout/Navigation'

const Login = () => {
  const dsp = useDispatch()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = e => {
    e.preventDefault()

    dsp(loginUser({ username, password }))
  }

  return !isAuthenticated ? (
    <div>
      <Navigation />

      <div className="container mt-4 wcinema-container">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">#</span>
          <input 
            type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"
            value={ username } onChange={ e => setUsername(e.target.value) }
          />
        </div>
      
        <div className="input-group mb-3">
          <input
            type="password" placeholder='Password' class="form-control"
            value={ password }  onChange={ e => setPassword(e.target.value) }
          />
        </div>

        <button type="button" class="btn btn-outline-primary btn-lg mb-3" onClick={ e => login(e) }>Login</button>

        <div className="info text-center">
          Don't have an account yet? <Link to='registration/'>Sign up here</Link>
        </div>
      </div>
    </div>
  ) : <Redirect to='/' />
}

export default Login

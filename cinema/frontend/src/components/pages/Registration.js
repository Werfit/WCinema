import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signUpUser } from 'actions/auth'

const Registration = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [domain, setDomain] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const dsp = useDispatch()
  const isAuthenticated = useSelector(state => state.auth.isAuth)

  const signUp = e => {
    e.preventDefault()

    if (password !== password2)
    {
      console.log('ERROR')
      return
    }

    dsp(signUpUser({ username, email: `${email}@${domain}`, password }))
  }

  return !isAuthenticated ? (
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
          type="text" className="form-control" placeholder="Email" aria-label="Email"
          value={ email } onChange={ e => setEmail(e.target.value) }
        />
        <span className="input-group-text">@</span>
        <input
          type="text" className="form-control" placeholder="Domain" aria-label="Domain"
          value={ domain } onChange={ e => setDomain(e.target.value) }
        />
      </div>

      <div className="input-group mb-3">
        <input
          type="password" placeholder='Password' className="form-control"
          value={ password } onChange={ e => setPassword(e.target.value) }
        />
      </div>

      <div className="input-group mb-3">
        <input
          type="password" placeholder='Repeat password' className="form-control" 
          value={ password2 } onChange={ e => setPassword2(e.target.value) }
        />
      </div>

      <button type="button" className="btn btn-outline-primary btn-lg mb-3" onClick={ e => signUp(e) }>Sign up</button>

      <div className="info text-center">
        You already have an account? <Link to='login/'>Log in here</Link>
      </div>
    </div>
  ) : <Redirect to='/' />
}

export default Registration

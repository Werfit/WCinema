import React from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../layout/Navigation'

const Registration = () => {
  return (
    <div>
      <Navigation />

      <div className="container mt-4 wcinema-container">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">#</span>
          <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
        </div>
        
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Email" aria-label="Email" />
          <span className="input-group-text">@</span>
          <input type="text" className="form-control" placeholder="Domain" aria-label="Domain" />
        </div>

        <div className="input-group mb-3">
          <input type="password" placeholder='Password' class="form-control" />
        </div>

        <div className="input-group mb-3">
          <input type="password" placeholder='Repeat password' class="form-control" />
        </div>

        <button type="button" class="btn btn-outline-primary btn-lg mb-3">Sign up</button>

        <div className="info text-center">
          You already have an account? <Link to='login/'>Log in here</Link>
        </div>
      </div>
    </div>
  )
}

export default Registration

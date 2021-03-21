import React from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { logOutUser } from 'actions/auth'

const Navigation = () => {
  const dsp = useDispatch()
  const isAuthenticated = useSelector(state => state.auth.isAuth)

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">WCinema</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">Home</Link>
            </li>
            {
              !isAuthenticated && <>
                <li className="nav-item">
                  <Link to='/login' className="nav-link">Log In</Link>
                </li>
                <li className="nav-item">
                  <Link to='/register' className="nav-link">Sign up</Link>
                </li>
              </>
            }
            { isAuthenticated && <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                User
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="#">Profile</Link></li>
                <li><Link className="dropdown-item" to="#">Tomorrow</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="#" onClick={ () => dsp(logOutUser()) }>Log out</Link></li>
              </ul>
            </li> }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

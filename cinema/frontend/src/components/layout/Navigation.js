import React from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { logOutUser } from 'actions/auth'

const Navigation = () => {
  const dsp = useDispatch()
  const { isAuth: isAuthenticated, user } = useSelector(state => state.auth)

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">WCinema</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
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
                <li><Link className="dropdown-item" to="/history">History</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="#" onClick={ () => dsp(logOutUser()) }>Log out</Link></li>
              </ul>
            </li> }
            {
              isAuthenticated && user.isStaff && (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Add
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to="/add/movie">Movie</Link></li>
                    <li><Link className="dropdown-item" to="/add/hall">Hall</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" to="/add/session">Session</Link></li>
                  </ul>
                </li>
              )
          }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="#">WCinema</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="#">Home</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link">Update</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sessions
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="#">Today</Link></li>
                <li><Link className="dropdown-item" to="#">Tomorrow</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="#">Something else here</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link disabled" to="#" tabIndex="-1" aria-disabled="true">Profile</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

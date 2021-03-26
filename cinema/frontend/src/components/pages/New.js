import React from 'react'
import {  useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const New = ({ btnFn, children }) => {
  const { isAuth: isAuthenticated, user, isLoading } = useSelector(state => state.auth)

  return isLoading ? <div>Loading...</div> : (isAuthenticated && user.isStaff) ? (
    <div className='container mt-4 wcinema-container'>
      { children }
      <button type="button" className="btn btn-outline-primary btn-lg mb-3" onClick={ e => btnFn(e) }>Publish</button>
    </div>
  ) : <Redirect to='/' />
}

export default New

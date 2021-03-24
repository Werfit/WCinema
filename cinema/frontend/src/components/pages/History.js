import React, { useEffect } from 'react'
import Navigation from '../layout/Navigation'
import Ticket from '../movies/Ticket'

import { useDispatch, useSelector } from 'react-redux'
import { loadTickets } from 'actions/tickets'
import { Redirect } from 'react-router-dom'

const History = () => {
  const dsp = useDispatch()
  const tickets = useSelector(state => state.tickets)
  const { isAuth } = useSelector(state => state.auth)

  useEffect(() => dsp(loadTickets()), [])

  return isAuth ? (
    <div className="wcinema-container container mt-4">
      {
        tickets ?
          tickets.map(ticket => <Ticket key={ ticket.id } ticket={ ticket }/>) :
          <p>No tickets bought yet</p>
      }
    </div>
  ) : <Redirect to='/login'/>
}

export default History

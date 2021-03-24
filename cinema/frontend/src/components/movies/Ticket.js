import React from 'react'
import moment from 'moment'

const Ticket = ({ ticket }) => {
  return (
    <div className="card">
      <div className="card-header">
        { moment(ticket.date).format('DD.MM.YYYY') }
      </div>
      <div className="card-body">
        <h5 className="card-title">{ ticket.name }</h5>
        <p className="card-text">Price: ${ ticket.price } | Place: ${ ticket.place }</p>
      </div>
    </div>
  )
}

export default Ticket

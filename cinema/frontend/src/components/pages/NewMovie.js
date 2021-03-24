import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { publishMovie } from 'actions/admin'

import moment from 'moment'

import New from './New'

const NewMovie = () => {
  const [name, setName] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [description, setDescription] = useState('')

  const dsp = useDispatch()

  const publish = e => {
    e.preventDefault()

    dsp(publishMovie({ name, start_day: start, end_day: end, description }))
    
    setName('')
    setStart('')
    setEnd('')
    setDescription('')
  }

  return (
    <New btnFn={ publish }>
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
    </New>
  )
}

export default NewMovie

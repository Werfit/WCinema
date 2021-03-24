import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { publishHall } from 'actions/admin'

import New from './New'

const NewMovie = () => {
  const [name, setName] = useState('')
  const [size, setSize] = useState(0)

  const dsp = useDispatch()

  const publish = e => {
    e.preventDefault()

    dsp(publishHall({ name, size }))

    setName('')
    setSize(0)
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
          type="number" placeholder='Size' className="form-control"
          value={ size }  onChange={ e => setSize(e.target.value) }
        />
      </div>
    </New>
  )
}

export default NewMovie

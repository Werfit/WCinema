import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHMNames, publishSession } from 'actions/admin'

import New from './New'
import moment from 'moment'

const NewSession = () => {
  const { isLoading, data } = useSelector(state => state.admin)
  const dsp = useDispatch()

  const now = moment(Date.now()).format('YYYY-MM-DDTHH:mm')

  const [hall, setHall] = useState(0)
  const [movie, setMovie] = useState(0)
  const [start, setStart] = useState(now)
  const [end, setEnd] = useState(now)
  const [price, setPrice] = useState(0)

  useEffect(() => dsp(getHMNames()), [])
  
  const publish = e => {
    e.preventDefault()

    console.log({ hall, movie })

    dsp(publishSession({ hall: +hall, movie: +movie, 
      start: moment(start).format(),
      end: moment(end).format(),
      price: +price
    }))

    setHall(0)
    setMovie(0)
    setStart(now)
    setEnd(now)
    setPrice(0)
  }

  return (
    <New btnFn={ publish }>
      {
        !isLoading && data? (
          <>
            <div className="mb-3">
              <label htmlFor="hall" className="form-label">Hall:</label>
              <select className="form-select" value={ hall } onChange={ e => setHall(e.target.value) } id="hall">
                <option value="0">Choose hall</option>
                {
                  data.halls.map(hall => <option key={ hall.id } value={ hall.id }>{ hall.name }</option>)
                }
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="movie" className="form-label">Movie:</label>
              <select className="form-select" value={ movie } onChange={ e => setMovie(e.target.value) } id="movie">
                <option value="0">Choose movie</option>
                {
                  data.movies.map(movie => <option key={ movie.id } value={ movie.id }>{ movie.name }</option>)
                }
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="start" className="form-label">Start Time:</label>
              <input type="datetime-local" className="form-control" id="start"
                value={ start } onChange={ e => setStart(e.target.value) }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="end" className="form-label">End Time:</label>
              <input type="datetime-local" className="form-control" id="end"
                value={ end } onChange={ e => setEnd(e.target.value) }
              />
            </div>

            <div className="input-group mb-3">
              <label htmlFor="price" className="input-group-text">$</label>
              <input type="number" className="form-control" id="price" placeholder="Price for a ticket" 
                value={ price } onChange={ e => setPrice(e.target.value) }
              /> 
            </div>
          </>
        ) : <div>Loading...</div>
      }
    </New>
  )
}

export default NewSession

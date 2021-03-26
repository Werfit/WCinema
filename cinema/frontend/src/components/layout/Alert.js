import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Errors = () => {
  const { error, response } = useSelector(state => state.alerts)
  const [isVisible, toggleVisibility] = useState(false)

  const errs = {
    // COMMON
    detail: "Server",

    // FORMS
    name: "Name",
    start_day: "Start Day",
    end_day: "End Day",
    start: "Start Time",
    end: "End Time",
    hall: "Hall",
    movie: "Movie",

    // AUTH
    username: "Login",
    password: "Password",

  }

  useEffect(() => {
    if (response)
      show()
  }, [response])

  const show = () => {
    console.log(1)
    toggleVisibility(true)
    setTimeout(() => toggleVisibility(false), 3000)
  }

  return response && (
    <div className={ `errors alert alert-${error ? 'danger' : 'success'} ${ isVisible && 'alert-show' }` } role='alert'>
      { 
        Object.entries(response).map(([key, val], index) => {
          console.log(response, errs['detail'], key, val)
          if (errs[key])
            return <p key={ index }>{ errs[key] }: { val }</p>
          return <p key={ index }>Unknown Error: { val }</p>
        })
      }
    </div>
  )
}

export default Errors

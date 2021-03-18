import axios from 'axios'

import {
  GET_MOVIES,
} from './types'

// GET SESSION LIST
export const getMovies = (filter_day='today') => dispatch => {
  axios.get(`api/v1/movies/sessions?date=${filter_day}`)
    .then(result => dispatch({
      type: GET_MOVIES,
      payload: result.data
    }))
    .catch(err => console.log(err))
}
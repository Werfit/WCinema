import axios from 'axios'

import {
  GET_MOVIES
} from './types'

// GET SESSION LIST
export const getMovies = () => dispatch => {
  axios.get('api/v1/movies/sessions/')
    .then(result => dispatch({
      type: GET_MOVIES,
      payload: result.data
    }))
    .catch(err => console.log(err))
}
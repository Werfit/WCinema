import {
  TEST
} from './types'

import axios from 'axios'
import tokenConfig from 'utils/tokenConfig'

// CREATE MOVIE
export const publishMovie = movie => async (dispatch, getState) => {
  try {
    await axios.post('api/v1/movies/movies/', movie, tokenConfig(getState))

    dispatch({ type: TEST })
  } catch (err) {
    console.log(err)
  }
}
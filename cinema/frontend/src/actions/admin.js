import {
  TEST,
  LOAD_NAMES,
  NAMES_LOADED
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

// CREATE HALL
export const publishHall = hall => async (dispatch, getState) => {
  try {
    await axios.post('api/v1/movies/halls/', hall, tokenConfig(getState))

    dispatch({ type: TEST })
  } catch (err) {
    console.log(err)
  }
}

// CREATE SESSION
export const publishSession = session => async (dispatch, getState) => {
  try {
    console.log(session)
    await axios.post('api/v1/movies/sessions/', session, tokenConfig(getState))

    dispatch({ type: TEST })
  } catch (err) {
    console.log(err.response)
  }
}

// GET HALLS AND MOVIES NAMES
export const getHMNames = () => async (dispatch, getState) => {
  dispatch({ type: LOAD_NAMES })
  try {
    const result = await axios.get('api/v1/movies/sessions/get_halls_and_movies_names/', tokenConfig(getState))

    dispatch({
      type: NAMES_LOADED,
      payload: result.data
    })
  } catch (err) {
    console.log(err)
  }
}
import axios from 'axios'

import {
  GET_MOVIES,
  MOVIE_LOADING,
  MOVIE_SUCCESS
} from './types'

// GET MOVIES LIST
export const getMovies = (filter_day='today') => async dispatch => {
  try {
    const result = await axios.get(`api/v1/movies/movies?date=${filter_day}`)

    dispatch({
      type: GET_MOVIES,
      payload: result.data
    })
  } catch (err) {
    console.log(err)
  }
}

// GET MOVIE
export const getMovie = name => async dispatch => {
  dispatch({ type: MOVIE_LOADING })
  try {
    const result = await axios.get(`api/v1/movies/movies/${name}`)

    console.log(result)
    dispatch({
      type: MOVIE_SUCCESS,
      payload: result.data
    })
  } catch (err) {
    console.log(err)
  }
}
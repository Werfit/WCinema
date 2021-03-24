import axios from 'axios'

import {
  GET_MOVIES,
  MOVIE_LOADING,
  MOVIES_LOADING,
  MOVIE_SUCCESS,
  SESSION_LOADED
} from './types'

import tokenConfig from 'utils/tokenConfig'

// GET MOVIES LIST
export const getMovies = (filter_day='today') => async dispatch => {
  dispatch({ type: MOVIES_LOADING })
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

    dispatch({
      type: MOVIE_SUCCESS,
      payload: result.data
    })
  } catch (err) {
    console.log(err)
  }
}

// LOAD SESSION INFO
export const loadSession = session_id => async (dispatch, getState) => {
  try {
    const result = await axios.get(`api/v1/movies/sessions/${session_id}`, tokenConfig(getState))

    dispatch({
      type: SESSION_LOADED,
      payload: result.data
    })
  } catch (err) {
    console.log(err)
  }
}

// BUY TICKET
export const buyTicket = data => async (dispatch, getState) => {
  try {
    const result = await axios.post(`api/v1/movies/sessions/${data.session_id}/buy_ticket/`, { place: data.place }, tokenConfig(getState))

    dispatch({
      type: 'TEST'
    })
  } catch (err) {
    console.log(err)
  }
}
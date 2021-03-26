import axios from 'axios'

import {
  GET_MOVIES,
  MOVIE_LOADING,
  MOVIES_LOADING,
  MOVIE_SUCCESS,
  SESSION_LOADED
} from './types'

import { createError, createAlert } from './alerts'

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
    dispatch(createError(err.response))
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
    dispatch(createError(err.response))
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
    dispatch(createError(err.response))
  }
}

// BUY TICKET
export const buyTicket = data => async (dispatch, getState) => {
  try {
    const result = await axios.post(`api/v1/movies/sessions/${data.session_id}/buy_ticket/`, { place: data.place }, tokenConfig(getState))

    dispatch(createAlert('Success'))
  } catch (err) {
    dispatch(createError(err.response))
  }
}
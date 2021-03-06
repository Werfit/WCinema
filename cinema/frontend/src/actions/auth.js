import {
  USER_SUCCESS,
  USER_LOADING,
  USER_FAILED,
  USER_LOADED,
  USER_LOGOUT_SUCCESS
} from './types'

import { createError } from './alerts'

import axios from 'axios'
import tokenConfig from 'utils/tokenConfig'

// USER LOGIN
export const loginUser = user => async (dispatch, getState) => {
  try {
    const result = await axios.post('api/v1/authentication/login/', user, tokenConfig(getState))

    dispatch({
      type: USER_SUCCESS,
      payload: result.data
    })
  } catch (err) {
    dispatch({
      type: USER_FAILED,
      payload: err.response
    })
    dispatch(createError(err))
  }
}

// SIGN UP USER
export const signUpUser = user => async (dispatch, getState) => {
  try {
    const result = await axios.post('api/v1/authentication/register/', user, tokenConfig(getState))

    dispatch({
      type: USER_SUCCESS,
      payload: result.data
    })
  } catch (err) {
    dispatch(createError(err.response))
  }
}

// CHECKING TOKEN
export const loadUser = () => async (dispatch, getState) => {
  console.log('LOADING...')
  dispatch({ type: USER_LOADING })
  
  try {
    const result = await axios.get('api/v1/authentication/user/', tokenConfig(getState))

    dispatch({
      type: USER_LOADED,
      payload: result.data
    })
    console.log('DONE')
  } catch (err) {
    dispatch({
      type: USER_FAILED,
      payload: err.response
    })
    dispatch(createError(err.response))
  }
}

// LOG OUT USER
export const logOutUser = () => async (dispatch, getState) => {
  try {
    await axios.post('api/v1/authentication/logout/', null, tokenConfig(getState))

    dispatch({
      type: USER_LOGOUT_SUCCESS
    })
  } catch (err) {
    dispatch(createError(err.response))
  }
}
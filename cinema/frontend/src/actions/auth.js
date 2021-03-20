import {
  USER_SUCCESS,
  USER_LOADING,
  USER_FAILED,
  USER_LOADED
} from './types'

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
  }
}

export const loadUser = () => async (dispatch, getState) => {
  const result = await axios.get('api/v1/authentication/user/', tokenConfig(getState))

  dispatch({
    type: USER_LOADED,
    payload: result.data
  })
}
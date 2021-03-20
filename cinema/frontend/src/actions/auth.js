import {
  USER_SUCCESS,
  USER_LOADING
} from './types'

import axios from 'axios'
import tokenConfig from 'utils/tokenConfig'

// USER LOGIN
export const loginUser = user => (dispatch, getState) => {
  axios.post('api/v1/authentication/login/', user, tokenConfig(getState))
    .then(res => dispatch({
      type: USER_SUCCESS,
      payload: res.data
    }))
    .catch(err => console.log(err))
}

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING })

  axios.get('api/v1/authentication/user/', tokenConfig(getState))
    .then(res => dispatch({
      type: USER_LOADED,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: USER_FAILED,
      payload: err.response
    }))
} 
import {
  USER_SUCCESS,
  USER_LOADING,
  USER_LOADED,
  USER_FAILED,
  USER_LOGOUT_SUCCESS
} from 'actions/types'

const initialState = {
  user: null,
  isAuth: false,
  token: localStorage.getItem('usr_token'),
  isLoading: false
}

export default function (state=initialState, action) {
  switch (action.type) {
    case USER_SUCCESS:
      localStorage.setItem('usr_token', action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuth: true
      }
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        user: action.payload
      }
    case USER_FAILED:
    case USER_LOGOUT_SUCCESS:
      localStorage.removeItem('usr_token')
      return {
        ...state,
        user: null,
        isAuth: false,
        token: null,
        isLoading: false
      }
    default:
      return state
  }
}
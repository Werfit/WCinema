import { combineReducers } from 'redux'

import MoviesReducer from './movies'
import AuthenticationReducer from './auth'

export default combineReducers({
  movies: MoviesReducer,
  auth: AuthenticationReducer
})
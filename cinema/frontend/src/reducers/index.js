import { combineReducers } from 'redux'

import MoviesReducer from './movies'

export default combineReducers({
  movies: MoviesReducer
})
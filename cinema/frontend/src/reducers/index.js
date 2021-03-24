import { combineReducers } from 'redux'

import MoviesReducer from './movies'
import AuthenticationReducer from './auth'
import AdminReducer from './admin'
import TicketsReducer from './tickets'

export default combineReducers({
  movies: MoviesReducer,
  auth: AuthenticationReducer,
  admin: AdminReducer,
  tickets: TicketsReducer
})
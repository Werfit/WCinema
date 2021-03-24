import {
  // MOVIES
  GET_MOVIES,
  MOVIE_SUCCESS,
  MOVIES_LOADING,
  MOVIE_LOADING,

  // ADMIN
  TEST,

  // SESSION
  SESSION_LOADING,
  SESSION_LOADED
} from 'actions/types'

const initalState = {
  list: [],
  isLoading: false,
  currentMovie: null,
  session: null
}

export default function (state=initalState, action) {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        isLoading: false,
        list: [...action.payload]
      }
    case MOVIE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentMovie: action.payload
      }
    case MOVIE_LOADING:
    case MOVIES_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case SESSION_LOADED:
      return {
        ...state,
        session: action.payload
      }
    case TEST:
      return state
    default:
      return state
  }
}
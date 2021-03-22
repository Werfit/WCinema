import {
  GET_MOVIES,
  MOVIE_SUCCESS,
  MOVIES_LOADING,
  MOVIE_LOADING,
  TEST
} from 'actions/types'

const initalState = {
  list: [],
  isLoading: false,
  currentMovie: null
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
    case TEST:
      return state
    default:
      return state
  }
}
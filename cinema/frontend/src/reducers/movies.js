import {
  GET_MOVIES,
  MOVIE_SUCCESS,
  MOVIE_LOADING
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
      return {
        ...state,
        isLoading: true
      }
    default:
      return state
  }
}
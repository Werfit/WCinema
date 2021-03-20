import {
  GET_MOVIES,
} from 'actions/types'

const initalState = {
  list: [],
  isLoading: true
}

export default function (state=initalState, action) {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        list: [...action.payload]
      }
    default:
      return state
  }
}
import {
  GET_MOVIES
} from 'actions/types'

const initalState = {
  sessions: [],
  isLoading: true
}

export default function (state=initalState, action) {
  switch (action.type) {
    case GET_MOVIES:
      console.log(action.payload)
      return {
        ...state,
        sessions: [...action.payload]
      }
    default:
      return state
  }
}
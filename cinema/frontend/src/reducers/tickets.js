import {
  TICKETS_LOADED
} from 'actions/types'

const initialState = []

export default (state=initialState, action) => {
  switch (action.type) {
    case TICKETS_LOADED:
      return action.payload
    default:
      return state
  }
}
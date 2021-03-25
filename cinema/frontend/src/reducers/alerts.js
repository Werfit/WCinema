import { 
  SHOW_ALERT, SHOW_ERROR
} from 'actions/types'

const initalState = {
  error: false,
  response: null
}

export default (state=initalState, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        error: false,
        response: action.payload
      }
    case SHOW_ERROR:
      return {
        ...state,
        error: true,
        response: action.payload
      }
    default:
      return state
  }
}
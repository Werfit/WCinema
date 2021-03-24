import {
  LOAD_NAMES,
  NAMES_LOADED
} from 'actions/types'

const initialState = {
  data: null,
  isLoading: false
}

export default (state=initialState, action) => {
  switch (action.type) {
    case LOAD_NAMES:
      return {
        ...state,
        isLoading: true
      }
    case NAMES_LOADED:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      }
    default:
      return state
  }
}
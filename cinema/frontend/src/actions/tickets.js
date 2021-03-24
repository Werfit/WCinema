import {
  TICKETS_LOADED
} from './types'
import axios from 'axios'
import tokenConfig from 'utils/tokenConfig'

// LOAD TICKETS HISTORY
export const loadTickets = () => async (dispatch, getState) => {
  try {
    const result = await axios.get('api/v1/movies/tickets/', tokenConfig(getState))

    dispatch({
      type: TICKETS_LOADED,
      payload: result.data
    })
  } catch (err) {
    console.log(err)
  }
}
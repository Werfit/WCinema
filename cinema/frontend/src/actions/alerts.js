import {
  SHOW_ALERT, SHOW_ERROR
} from './types'

// SHOWS ALERTS
export const createAlert = data => {
  return {
    type: SHOW_ALERT,
    payload: data
  }
}

// SHOWS ERRORS
export const createError = response => {
  return {
    type: SHOW_ERROR,
    payload: response.data
  }
}
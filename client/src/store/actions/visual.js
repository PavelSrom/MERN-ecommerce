import { LOADING, STOP_LOADING, SET_ALERT, REMOVE_ALERT } from './types'
import uuid from 'uuid'

export const showSpinner = () => dispatch => dispatch({ type: LOADING })
export const hideSpinner = () => dispatch => dispatch({ type: STOP_LOADING })

export const setAlert = (msg, type) => dispatch => {
  const id = uuid.v4()
  dispatch({ type: SET_ALERT, payload: { msg, type, id } })

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000)
}

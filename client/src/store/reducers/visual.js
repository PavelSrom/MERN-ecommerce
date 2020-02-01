import {
  LOADING,
  STOP_LOADING,
  SET_ALERT,
  REMOVE_ALERT
} from '../actions/types'

const initialState = {
  loading: false,
  alerts: []
}

const visualsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: true
      }
    case STOP_LOADING:
      return {
        ...state,
        loading: false
      }
    case SET_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, payload]
      }
    case REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter(alert => alert.id !== payload)
      }
    default:
      return state
  }
}

export default visualsReducer

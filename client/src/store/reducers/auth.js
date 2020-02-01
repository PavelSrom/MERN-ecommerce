import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTO_SIGNUP_SUCCESS,
  AUTO_SIGNUP_FAIL,
  LOGOUT,
  CLEAN_USER
} from '../actions/types'

const initialState = {
  isAuthenticated: false,
  user: null
}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_SUCCESS:
      localStorage.setItem('token', payload.token)
      return state
    case AUTO_SIGNUP_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuthenticated: true
      }
    case AUTH_FAIL:
    case AUTO_SIGNUP_FAIL:
    case CLEAN_USER:
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }
    default:
      return state
  }
}

export default authReducer

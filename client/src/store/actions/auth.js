import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTO_SIGNUP_SUCCESS,
  AUTO_SIGNUP_FAIL,
  LOGOUT,
  CLEAN_USER
} from './types'
import axios from 'axios'
import { setAxiosToken } from '../../utils/setAxiosToken'
import { getUserProfile } from './user'
import { setAlert, showSpinner, hideSpinner } from './visual'

export const registerUser = formData => async dispatch => {
  dispatch(showSpinner())
  try {
    const res = await axios.post('/api/auth/register', formData)
    dispatch({ type: AUTH_SUCCESS, payload: res.data })
    dispatch(autoSignupUser())
    dispatch(hideSpinner())
  } catch ({ response }) {
    dispatch({ type: AUTH_FAIL })
    dispatch(hideSpinner())
    dispatch(setAlert(response.data.message, 'error'))
  }
}

export const loginUser = formData => async dispatch => {
  dispatch(showSpinner())
  try {
    const res = await axios.post('/api/auth/login', formData)
    dispatch({ type: AUTH_SUCCESS, payload: res.data })
    dispatch(autoSignupUser())
    dispatch(hideSpinner())
  } catch ({ response }) {
    dispatch({ type: AUTH_FAIL })
    dispatch(hideSpinner())
    dispatch(setAlert(response.data.message, 'error'))
  }
}

export const autoSignupUser = () => async dispatch => {
  if (localStorage.token) setAxiosToken(localStorage.token)

  try {
    const res = await axios.get('/api/auth')
    dispatch({ type: AUTO_SIGNUP_SUCCESS, payload: res.data })
    dispatch(getUserProfile())
    dispatch(setAlert('Logged in successfully', 'success'))
  } catch (err) {
    dispatch({ type: AUTO_SIGNUP_FAIL })
    dispatch(setAlert('Automatic login failed, please log in', 'warning'))
  }
}

export const logout = () => dispatch => {
  dispatch({ type: CLEAN_USER })
  dispatch({ type: LOGOUT })
  dispatch(setAlert('Logged out successfully', 'success'))
}

export const deleteAccount = history => async dispatch => {
  try {
    await axios.delete('/api/auth')
    history.push('/')
    dispatch(setAlert('Account deleted', 'success'))
    dispatch({ type: CLEAN_USER })
  } catch ({ response }) {
    dispatch(setAlert(response.data.message, 'error'))
  }
}

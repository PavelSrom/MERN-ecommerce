import { combineReducers } from 'redux'
import products from './reducers/products'
import user from './reducers/user'
import auth from './reducers/auth'
import visual from './reducers/visual'

export default combineReducers({
  products,
  user,
  auth,
  visual
})

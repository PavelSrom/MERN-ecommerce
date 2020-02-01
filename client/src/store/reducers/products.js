import {
  GET_PRODUCTS,
  CLEAR_PRODUCTS,
  STOP_PAGINATION,
  GET_CURRENT_PRODUCT,
  CLEAR_CURRENT_PRODUCT,
  ADD_NEW_REVIEW
} from '../actions/types'

const initialState = {
  productCount: null,
  products: [],
  currentProduct: null,
  paginationable: true
}

const productsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: [...state.products, ...payload.products],
        productCount: payload.count,
        paginationable: true
      }
    case CLEAR_PRODUCTS:
      return {
        ...state,
        products: [],
        productCount: null,
        paginationable: null
      }
    case STOP_PAGINATION:
      return {
        ...state,
        paginationable: false
      }
    case GET_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: payload
      }
    case CLEAR_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: null
      }
    case ADD_NEW_REVIEW:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          reviews: payload
        }
      }
    default:
      return state
  }
}

export default productsReducer

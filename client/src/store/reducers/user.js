import {
  GET_PROFILE,
  ADD_TO_GUEST_CART,
  ADD_TO_USER_CART,
  CLEAR_PROFILE,
  ADD_TO_USER_FAVS,
  REMOVE_FROM_USER_FAVS,
  REMOVE_FROM_GUEST_CART,
  REMOVE_FROM_USER_CART,
  SAVE_GUEST_INFO,
  SAVE_DELPAY,
  INCREMENT_GUEST_PRODUCT,
  DECREMENT_GUEST_PRODUCT,
  USER_PRODUCT_QUANTITY,
  CLEAN_USER,
  CLEAN_GUEST,
  USER_PURCHASE,
  GUEST_PURCHASE
} from '../actions/types'

const initialState = {
  user: null,
  guest: {
    cart: [],
    info: null
  },
  delpay: null
}

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        user: payload
      }
    case CLEAR_PROFILE:
      return {
        ...state,
        user: null
      }
    case ADD_TO_GUEST_CART:
      return {
        ...state,
        guest: {
          ...state.guest,
          cart: [...state.guest.cart, { ...payload, quantity: 1 }]
        }
      }
    case ADD_TO_USER_CART:
      return {
        ...state,
        user: {
          ...state.user,
          cart: payload
        }
      }
    case REMOVE_FROM_GUEST_CART:
      const newGuestCart = state.guest.cart.filter(item => item._id !== payload)
      return {
        ...state,
        guest: {
          ...state.guest,
          cart: newGuestCart
        }
      }
    case REMOVE_FROM_USER_CART:
      const newUserCart = state.user.cart.filter(
        item => item.productId !== payload
      )
      return {
        ...state,
        user: {
          ...state.user,
          cart: newUserCart
        }
      }
    case ADD_TO_USER_FAVS:
      return {
        ...state,
        user: {
          ...state.user,
          favorites: payload
        }
      }
    case REMOVE_FROM_USER_FAVS:
      const newFavs = state.user.favorites.filter(
        fav => fav.productId !== payload
      )
      return {
        ...state,
        user: {
          ...state.user,
          favorites: newFavs
        }
      }
    case SAVE_GUEST_INFO:
      const guestInfo = {
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        address: {
          street: payload.street,
          postalCode: payload.postalCode,
          city: payload.city
        },
        phone: payload.phone
      }
      return {
        ...state,
        guest: {
          ...state.guest,
          info: guestInfo
        }
      }
    case SAVE_DELPAY:
      return {
        ...state,
        delpay: payload
      }
    case INCREMENT_GUEST_PRODUCT:
      const newGuestIncCart = [...state.guest.cart]
      let incIndex = state.guest.cart.findIndex(prod => prod._id === payload)
      let incProduct = { ...state.guest.cart[incIndex] }
      incProduct.quantity = incProduct.quantity + 1
      newGuestIncCart[incIndex] = incProduct
      return {
        ...state,
        guest: {
          ...state.guest,
          cart: newGuestIncCart
        }
      }
    case DECREMENT_GUEST_PRODUCT:
      const newGuestDecCart = [...state.guest.cart]
      let decIndex = state.guest.cart.findIndex(prod => prod._id === payload)
      let decProduct = { ...state.guest.cart[decIndex] }
      decProduct.quantity = decProduct.quantity - 1
      newGuestDecCart[decIndex] = decProduct
      return {
        ...state,
        guest: {
          ...state.guest,
          cart: newGuestDecCart
        }
      }
    case USER_PRODUCT_QUANTITY:
      const newCart = [...state.user.cart]
      const desiredIndex = state.user.cart.findIndex(
        prod => prod.productId === payload.productId
      )
      newCart[desiredIndex] = { ...payload }
      return {
        ...state,
        user: {
          ...state.user,
          cart: newCart
        }
      }
    case CLEAN_USER:
      return {
        ...state,
        user: null,
        delpay: null
      }
    case CLEAN_GUEST:
      return {
        ...state,
        guest: {
          cart: [],
          info: null
        },
        delpay: null
      }
    case USER_PURCHASE:
      return {
        ...state,
        user: {
          ...state.user,
          cart: []
        }
      }
    case GUEST_PURCHASE:
      return {
        ...state,
        guest: {
          ...state.guest,
          cart: []
        }
      }
    default:
      return state
  }
}

export default userReducer

const router = require('express').Router()
const auth = require('../middleware/auth')
const User = require('../models/User')
const Product = require('../models/Product')
const FavCart = require('../models/FavCart')

// DESC:      get user's profile
// ACCESS:    private
// ENDPOINT:  /api/me
router.get('/', auth, async (req, res) => {
  try {
    const myProfile = await User.findById(req.userID)

    return res.send(myProfile)
  } catch ({ code, message }) {
    console.error(message)
    return res.status(code ? code : 500).send({ message })
  }
})

// DESC:      update my profile
// ACCESS:    private
// ENDPOINT:  /api/me
router.put('/', auth, async (req, res) => {
  const { street, postalCode, city, phone } = req.body

  try {
    const me = await User.findById(req.userID)
    if (phone) me.phone = phone

    const adFields = {}
    street ? (adFields.street = street) : (adFields.street = me.address.street)
    postalCode
      ? (adFields.postalCode = postalCode)
      : (adFields.postalCode = me.address.postalCode)
    city ? (adFields.city = city) : (adFields.city = me.address.city)

    me.address = adFields
    await me.save()

    return res.send(me)
  } catch ({ code, message }) {
    console.error(message)
    return res.status(code ? code : 500).send({ message })
  }
})

// DESC:      add product to favorites
// ACCESS:    private
// ENDPOINT:  /api/me/fav
router.post('/fav/:id', auth, async (req, res) => {
  try {
    const targetProduct = await Product.findById(req.params.id).select(
      '_id name imgSrc price'
    )
    if (!targetProduct)
      return res.status(404).send({ message: 'Product not found' })

    const favs = await User.findById(req.userID).select('favorites')

    const alreadyFav = favs.favorites.some(
      fav => fav.productId.toString() === req.params.id
    )
    if (alreadyFav)
      return res.status(400).send({ message: 'You already like this product' })

    const newFavProduct = new FavCart({
      imgSrc: targetProduct.imgSrc,
      productId: targetProduct._id,
      name: targetProduct.name,
      price: targetProduct.price
    })
    favs.favorites.unshift(newFavProduct)
    await favs.save()

    return res.status(201).send({ favorites: favs.favorites })
  } catch ({ code, message }) {
    console.error(message)
    return res.status(code ? code : 500).send({ message })
  }
})

// DESC:      remove product from favorites
// ACCESS:    private
// ENDPOINT:  /api/me/fav/:id
router.delete('/fav/:id', auth, async (req, res) => {
  try {
    const favs = await User.findById(req.userID).select('favorites')

    const existsInFavs = favs.favorites.find(
      fav => fav.productId.toString() === req.params.id
    )
    if (!existsInFavs)
      return res.status(400).send({ message: 'This product cannot be deleted' })

    favs.favorites = favs.favorites.filter(
      fav => fav.productId.toString() !== req.params.id
    )
    await favs.save()

    return res.send({ message: 'Removed from favorites' })
  } catch ({ code, message }) {
    console.error(message)
    return res.status(code ? code : 500).send({ message })
  }
})

// DESC:      add product to cart
// ACCESS:    private
// ENDPOINT:  /api/me/cart/:id
router.post('/cart/:id', auth, async (req, res) => {
  try {
    const targetProduct = await Product.findById(req.params.id).select(
      '_id name imgSrc price'
    )
    if (!targetProduct)
      return res.status(404).send({ message: 'Product not found' })

    const cart = await User.findById(req.userID).select('cart')

    const alreadyInCart = cart.cart.some(
      item => item.productId.toString() === req.params.id
    )
    if (alreadyInCart)
      return res
        .status(400)
        .send({ message: 'You already bought this product' })

    const newCartItem = new FavCart({
      imgSrc: targetProduct.imgSrc,
      productId: targetProduct._id,
      name: targetProduct.name,
      price: targetProduct.price,
      quantity: 1
    })
    cart.cart.unshift(newCartItem)
    await cart.save()

    return res.status(201).send({ cart: cart.cart })
  } catch ({ code, message }) {
    console.error(message)
    return res.status(code ? code : 500).send({ message })
  }
})

// DESC:      edit the amount of something in a cart
// ACCESS:    private
// ENDPOINT:  /api/me/cart/:id
router.put('/cart/:id', auth, async (req, res) => {
  const { type } = req.body

  try {
    const user = await User.findById(req.userID)
    const productToUpdate = user.cart.find(
      item => item.productId.toString() === req.params.id
    )
    if (!productToUpdate)
      return res.status(400).json({ message: 'Product not found' })
    const targetIndex = user.cart.findIndex(
      item => item.productId.toString() === req.params.id
    )

    let newQuantity
    if (type === 'increment') {
      newQuantity = productToUpdate.quantity + 1
    } else {
      newQuantity = productToUpdate.quantity - 1
    }

    const updatedItem = {
      ...productToUpdate,
      quantity: newQuantity
    }
    const newCart = [...user.cart]

    newCart[targetIndex] = updatedItem
    user.cart = newCart

    await user.save()

    return res.send(updatedItem)
  } catch ({ code, message }) {
    console.error(message)
    return res.status(code ? code : 500).send({ message })
  }
})

// DESC:      remove product from cart
// ACCESS:    private
// ENDPOINT:  /api/me/cart/:id
router.delete('/cart/:id', auth, async (req, res) => {
  try {
    const cart = await User.findById(req.userID).select('cart')

    const existsInCart = cart.cart.find(
      item => item.productId.toString() === req.params.id
    )
    if (!existsInCart)
      return res.status(400).send({ message: 'This product cannot be deleted' })

    cart.cart = cart.cart.filter(
      item => item.productId.toString() !== req.params.id
    )
    await cart.save()

    return res.send({ message: 'Removed from cart' })
  } catch ({ code, message }) {
    console.error(message)
    return res.status(code ? code : 500).send({ message })
  }
})

module.exports = router

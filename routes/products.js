const router = require('express').Router()
const multer = require('multer')
const uuid = require('uuid')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const Product = require('../models/Product')
const Review = require('../models/Review')
const auth = require('../middleware/auth')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    const suffix = file.mimetype.replace('image/', '.')
    const imgId = uuid.v4()

    req.imgSrc = `${imgId}${suffix}`
    cb(null, imgId + suffix)
  }
})

// DESC       get all products (heavy endpoint)
// ACCESS     public
// ENDPOINT   /api/products
router.get('/', async (req, res) => {
  const { category, page, sortBy, search, maxPrice } = req.query
  const QUERY_LIMIT = 6 // pagination

  const filter = {}
  if (category) filter.category = category // tested
  if (search) filter.name = new RegExp(search, 'i') // tested
  if (maxPrice) filter.price = { $lte: Number(maxPrice) } // tested

  const sort = {}
  if (sortBy) {
    if (sortBy === 'price') {
      sort[sortBy] = 1
    } else {
      sort[sortBy] = -1
    }
  }

  try {
    const count = await Product.find(filter) // tested
      .sort(sort)
      .countDocuments()
    const products = await Product.find(filter) // tested
      .skip((page - 1) * QUERY_LIMIT)
      .limit(QUERY_LIMIT)
      .sort(sort)

    return res.send({ count, products })
  } catch ({ code, message }) {
    console.error(message)
    return res.status(code ? code : 500).send({ message })
  }
})

// DESC       get a single product
// ACCESS     public
// ENDPOINT   /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).send({ message: 'Product not found' })

    return res.send(product)
  } catch ({ code, message }) {
    console.error(message)
    return res.status(code ? code : 500).send({ message })
  }
})

// DESC       review a product
// ACCESS     private
// ENDPOINT   /api/products/:id/review
router.post(
  '/:id/review',
  [
    auth,
    check('reviewText', 'Review text is requited')
      .not()
      .isEmpty(),
    check('rating', 'Rating is required').isInt()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).send({ errors: errors.array() })

    const { reviewText, rating } = req.body

    try {
      const targetProduct = await Product.findById(req.params.id).select(
        'reviews'
      )

      const reviewAlreadyPosted = targetProduct.reviews.find(
        rev => rev.user.toString() === req.userID
      )
      if (reviewAlreadyPosted)
        return res.status(400).send({ message: 'You cannot review twice' })

      const me = await User.findById(req.userID).select('firstName lastName')
      const newReview = new Review({
        user: req.userID,
        firstName: me.firstName,
        lastName: me.lastName,
        reviewText,
        rating
      })

      targetProduct.reviews.unshift(newReview)

      const newRating =
        targetProduct.reviews.reduce((acc, val) => acc + val.rating, 0) /
        targetProduct.reviews.length
      targetProduct.rating = newRating

      await targetProduct.save()

      return res.status(201).send({ reviews: targetProduct.reviews })
    } catch ({ code, message }) {
      console.error(message)
      return res.status(code ? code : 500).send({ message })
    }
  }
)

// DESC       post a new product
// ACCESS     private (owner only)
// ENDPOINT   /api/products
router.post(
  '/',
  [
    multer({ storage }).single('image')
    /*
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('category', 'Category is required')
      .not()
      .isEmpty(),
    check('price', 'Price must be a number').isInt(),
    check('stock', 'Provide stock').isInt(),
    check('description', 'Description is required')
      .not()
      .isEmpty()
    */
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).send({ errors: errors.array() })

    const { name, category, price, stock, description, specs } = req.body

    try {
      const newProduct = new Product({
        name,
        category,
        price,
        stock,
        description,
        specs,
        imgSrc: req.imgSrc
      })

      await newProduct.save()

      return res.status(201).send(newProduct)
    } catch ({ code, message }) {
      console.error(message)
      return res.status(code ? code : 500).send({ message })
    }
  }
)

// DESC       update a single product
// ACCESS     private (owner only)
// ENDPOINT   /api/products/:id
router.put('/:id', async (req, res) => {
  const { name, category, price, description, specs } = req.body

  try {
    const productToUpdate = await Product.findById(req.params.id)
    if (name) productToUpdate.name = name
    if (category) productToUpdate.category = category
    if (description) productToUpdate.description = description
    if (specs) productToUpdate.specs = specs
    if (price) productToUpdate.price = price

    await productToUpdate.save()

    return res.send(productToUpdate)
  } catch ({ code, message }) {
    console.error(message)
    return res.status(code ? code : 500).send({ message })
  }
})

// DESC       refill stock in products
// ACCESS     private (owner only)
// ENDPOINT   /api/products
router.put('/', auth, async (req, res) => {
  try {
    await Product.updateMany({ $set: { stock: 100 } })

    return res.send({ message: 'Stock updated successfully' })
  } catch ({ code, message }) {
    console.error(message)
    return res.status(code ? code : 500).send({ message })
  }
})

// DESC       subtract quantity for multiple products for guests
// ACCESS     public
// ENDPOINT   /api/products/quantity/guest
router.post('/quantity/guest', async (req, res) => {
  const { cart } = req.body

  try {
    for (let item of cart) {
      const product = await Product.findById(item._id)
      if (!product)
        return res.status(400).send({ message: 'Product not found' })

      product.stock = product.stock - item.quantity
      await product.save()
    }

    return res.send({ message: 'Payment successful' })
  } catch ({ code, message }) {
    return res.status(code ? code : 500).send({ message })
  }
})

// DESC       subtract quantity for multiple products for users
// ACCESS     private
// ENDPOINT   /api/products/quantity/user
router.post('/quantity/user', auth, async (req, res) => {
  try {
    const me = await User.findById(req.userID)

    for (let item of me.cart) {
      const product = await Product.findById(item.productId)
      if (!product)
        return res.status(400).send({ message: 'Product not found' })

      product.stock = product.stock - item.quantity
      await product.save()
    }

    me.cart = []
    await me.save()

    return res.send({ message: 'Payment successful' })
  } catch ({ code, message }) {
    return res.status(code ? code : 500).send({ message })
  }
})

// DESC       delete a product
// ACCESS     private (owner only)
// ENDPOINT   /api/products/:id
router.delete('/:id', async (req, res) => {
  try {
    const productToDelete = await Product.findById(req.params.id)
    if (!productToDelete)
      return res.status(404).send({ message: 'Product not found' })

    await productToDelete.remove()

    return res.send({ message: 'Product removed successfully!' })
  } catch ({ code, message }) {
    console.error(message)
    return res.status(code ? code : 500).send({ message })
  }
})

module.exports = router

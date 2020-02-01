const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth')
const User = require('../models/User')

// DESC:      verify user's token
// ACCESS:    private
// ENDPOINT:  /api/auth
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userID).select('email')

    return res.send(user)
  } catch ({ code, message }) {
    console.error(message)
    return res.status(code ? code : 500).send({ message })
  }
})

// DESC:      register user in the system
// ACCESS:    public
// ENDPOINT:  /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({
      min: 6
    }),
    check('firstName', 'First name is required')
      .not()
      .isEmpty(),
    check('lastName', 'Last name is required')
      .not()
      .isEmpty(),
    check('street', 'Street is required')
      .not()
      .isEmpty(),
    check('postalCode', 'Post code is required')
      .not()
      .isEmpty(),
    check('city', 'City is required')
      .not()
      .isEmpty(),
    check('phone', 'Phone number is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).send({ errors: errors.array() })

    const {
      email,
      password,
      firstName,
      lastName,
      street,
      postalCode,
      city,
      phone
    } = req.body

    try {
      const userExists = await User.findOne({ email })
      if (userExists)
        return res
          .status(400)
          .send({ message: 'User with this email already exists' })

      const newUser = new User({
        email,
        password,
        firstName,
        lastName,
        address: {
          street,
          postalCode,
          city
        },
        phone
      })
      newUser.password = await bcrypt.hash(password, 8)

      await newUser.save()

      const token = jwt.sign({ id: newUser._id }, config.get('jwtSecret'), {
        expiresIn: 3600
      })

      return res.status(201).send({ token })
    } catch ({ code, message }) {
      console.error(message)
      return res.status(code ? code : 500).send({ message })
    }
  }
)

// DESC:      login user into the system
// ACCESS:    public
// ENDPOINT:  /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Email is required')
      .not()
      .isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).send({ errors: errors.array() })

    const { email, password } = req.body

    try {
      const user = await User.findOne({ email })
      if (!user) return res.status(400).send({ message: 'Invalid credentials' })

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch)
        return res.status(400).send({ message: 'Invalid credentials' })

      const token = jwt.sign({ id: user._id }, config.get('jwtSecret'), {
        expiresIn: 3600
      })

      return res.send({ token })
    } catch ({ code, message }) {
      console.error(message)
      return res.status(code ? code : 500).send({ message })
    }
  }
)

// DESC:      delete user account
// ACCESS:    private
// ENDPOINT:  /api/auth
router.delete('/', auth, async (req, res) => {
  try {
    const userToDelete = await User.findById(req.userID)
    if (!userToDelete)
      return res.status(404).send({ message: 'User not found' })

    await userToDelete.remove()

    return res.send({ message: 'Account deleted successfully!' })
  } catch ({ code, message }) {
    console.error(message)
    return res.status(code ? code : 500).send({ message })
  }
})

// DESC:      reset password route
// ACCESS:    public
// ENDPOINT:  /api/auth/reset
router.post('/reset', async (req, res) => {
  try {
  } catch ({ code, message }) {
    console.error(message)
    return res.status(code ? code : 500).send({ message })
  }
})

module.exports = router

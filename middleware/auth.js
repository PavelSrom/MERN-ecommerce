const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token')
  if (!token) return res.status(401).send({ message: 'No token provided' })

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.userID = decoded.id

    next()
  } catch ({ message }) {
    console.error(message)
    return res.status(401).send({ message })
  }
}

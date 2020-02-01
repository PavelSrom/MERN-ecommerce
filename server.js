const express = require('express')
const mongoose = require('mongoose')
const socketio = require('socket.io')
const config = require('config')
const http = require('http')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.json())
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/products', require('./routes/products'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/me', require('./routes/users'))

mongoose
  .connect(config.get('mongoURI'), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Database connected'))
  .catch(err => {
    console.log(err)
    console.error(err.message)
  })

io.on('connection', socket => {
  console.log('new connection...')
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Listening on port ${PORT}...`))

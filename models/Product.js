const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String
    //required: true
  },
  category: {
    type: String
    //required: true
  },
  imgSrc: {
    type: String,
    required: true
  },
  price: {
    type: Number
    //required: true
  },
  stock: {
    type: Number,
    default: 100
  },
  description: {
    type: String
    //required: true
  },
  rating: {
    type: Number
  },
  specs: {
    cpu: {
      type: String
      //required: true
    },
    ram: {
      type: String
      //required: true
    },
    display: {
      type: String
      //required: true
    }
  },
  reviews: []
})

module.exports = mongoose.model('Product', productSchema)

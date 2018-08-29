const mongoose = require('mongoose');



const bookScheema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  review: {
    type: String,
    default: 'n/a' 
  },
  pages: {
    type: String,
    default: 'n/a'
  },
  rating: {
    type: Number,
    require: true,
    min: 1,
    max: 5
  },
  price: {
    type: String,
    default: 'n/a'
  },
  ownerId: {
    type: String,
    required: true
  }
}, {timestamps: true});


const Book = mongoose.model('Book', bookScheema);


module.exports = { Book };
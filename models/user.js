const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({ // Define schema for User
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  address:{
    type: String,
    required: true

  },
  email: {
    type: String,
    required: true
  },
  dateOfSignUp: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('User', UserSchema) // Export model for use in other files
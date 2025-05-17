const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://practice:new@cluster0.bs7cqd8.mongodb.net/");

const UserSchema = new mongoose.Schema({
  username: {
  type: String,
  required: true,
  unique: true,
  maxLength: 30,
  },

  password: {
  type: String,
  required: true,
  maxLength: 30,
  },

  firstName: {
  type: String,
  required: true,
  trim: true,
  maxLength: 30,
  },

  lastName: {
  type: String,
  required: true,
  trim: true,
  maxLength: 30,
  }
  
});


const CardsSchema = new mongoose.Schema({
  bname: {
  type: String,
  required: true,
  },

  designation: {
  type: String,
  required: true,
  },

  firstName: String,

  lastname: String,

  contact: {
    type: Number,
    required: true
  },
  
  webname: {
  type: String,
  required: true,
  },

  address: {
  type: String,
  required: true,
  }
  
})


const User = mongoose.model('User', UserSchema)
const Cards = mongoose.model('Cards',CardsSchema)



module.exports = {
  User,
  Cards
}
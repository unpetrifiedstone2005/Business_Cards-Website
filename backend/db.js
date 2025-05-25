require('dotenv').config({ path: '.env.development' });
const mongoose = require("mongoose");

console.log('MONGO_URI:', process.env.MONGO_URI);



mongoose.connect(process.env.MONGO_URI);

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
  
  email: {
    type: String,
    unique: true,
    required: true
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

  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
  },

  bname: {
  type: String,
  required: true,
  },

  designation: {
  type: String,
  required: true,
  },

  firstName: String,

  lastName: String,

  email: {
    type: String,
    required: true
  },

  contact: {
    type: String,
    required: true,
    maxLength: 12
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
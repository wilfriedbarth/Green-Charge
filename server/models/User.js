const mongoose = require('mongoose');
const { Schema } = mongoose; 

const userSchema = new Schema({
  username: String,
  email: String,
  password:   String,
  countryCode: String
});

module.exports = mongoose.model('User', userSchema);

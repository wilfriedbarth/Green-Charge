const { Schema } = require('mongoose');

const userSchema = new Schema({
  username: String,
  email: String,
  password:   String,
  countryCode: String
});

module.exports = userSchema;

const { Schema } = require("mongoose");

var userSchema = new Schema({
  username: String,
  email: String,
  password:   String,
  countryCode: String
});
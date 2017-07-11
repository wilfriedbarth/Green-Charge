const mongoose = require('mongoose');
const { Schema } = mongoose; 

const deviceSchema = new Schema({
  device: { type: Number, unique: true, trim: true },
  userId: { type: String, default: null }, 
  countryCode: { type: String, uppercase: true },
  auto: {type: Boolean, default: true},
  chargingStatus: {type: Boolean, default: false}
});

module.exports = mongoose.model('Device', deviceSchema, 'Device');

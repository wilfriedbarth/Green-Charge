const mongoose = require('mongoose');
const { Schema } = mongoose; 

const deviceSchema = new Schema({
  device: { type: Number, unique: true, trim: true },
  claimed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Device', deviceSchema, 'Device');
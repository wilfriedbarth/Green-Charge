const mongoose = require('mongoose');
const { Schema } = mongoose; 

const { setParticleStatus } = require('../queries/particle-api/apiQueries');

const deviceSchema = new Schema({
  particleId: { type: String, unique: true, trim: true },
  userId: { type: String, default: null }, 
  countryCode: { type: String, uppercase: true },
  auto: {type: Boolean, default: true},
  chargingStatus: {type: Boolean, default: false}
});

deviceSchema.post('save', function(device) {
  // after save to database, send out POST request to
  // device with new chargingStatus
  const { particleId, auto, chargingStatus } = device;

  if (auto && chargingStatus) {
    setParticleStatus(particleId, 'pwr', 'on');
  } else if (auto && !chargingStatus) {
    setParticleStatus(particleId, 'pwr', 'off');
  }
  
});

module.exports = mongoose.model('Device', deviceSchema, 'Device');

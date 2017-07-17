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

deviceSchema.post('update', function(device) {
  // after update to database, send out POST request to
  // device with new chargingStatus
  const { particleId, auto, chargingStatus } = device;
  console.log(device);

  let newStatus;
  if (auto && chargingStatus) {
    newStatus = setParticleStatus(particleId, 'pwr', 'on');
  } else if (auto && !chargingStatus) {
    newStatus = setParticleStatus(particleId, 'pwr', 'off');
  }

  console.log(newStatus);
  
});

module.exports = mongoose.model('Device', deviceSchema, 'Device');

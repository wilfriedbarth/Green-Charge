const Device = require('../../models/Device');

module.exports = {
  updateDevicesByCountry(countryCode, props) {
    return Device.updateMany(
      { countryCode },
      props
    ).exec();
  },
  fetchDevicesForUser(userId) {
    return Device.find({ userId }).exec();
  },
  updateDeviceAuto(deviceId, auto = true) {
    
    return Device.findByIdAndUpdate(
      deviceId,
      { auto }
    ).exec();
  }, 
  setParticleOwnership(deviceId, userId){

    return Device.findByIdAndUpdate(
      deviceId,
      { userId }
    ).exec();
  },
  createDevice(particleId) {
    return Device.create({particleId}); 
  }
};

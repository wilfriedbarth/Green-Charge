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
 console.log(deviceId.particleId, userId)
    return Device.findOneAndUpdate(
      { particleId: deviceId },
      { userId }
    ).exec();
  },
  createDevice(particleId) {
    return Device.create({particleId}); 
  }
};

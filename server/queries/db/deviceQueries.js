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
    return Device.findAndUpdateById(
      particleId,
      { particleId }
    ).exec();
  }, 
  setParticleOwnership(deviceId, userId){
    return Device.update(
      deviceId,
      { userId }
    ).exec();
  },
  createDevice(props) {
    return Device.create(props); 
  }
};

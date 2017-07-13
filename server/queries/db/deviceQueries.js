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
  }
};

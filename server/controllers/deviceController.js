require('dotenv').config();

const {
  getParticleStatus,
  setParticleStatus
} = require('../queries/particle-api/apiQueries.js');

const {
  createDevice,
  fetchDevicesForUser,
  updateDeviceAuto,
  setParticleOwnership
} = require('../queries/db/deviceQueries.js');

// local dependencies
const User = require('../models/User');

module.exports = {
  getStatus(req, res, next) {
    const { particleId } = req.params;

    return getParticleStatus(particleId)
      .then(resp => {
        const status = resp; 
        if (!status) {
          res.json({ status: 'off' });
        } else if (status) {
          res.json({ status: 'on' });
        }
      })
      .catch(next);
  },
  setStatus(req, res, next) {
    const { particleId } = req.params;
    const { chargingState } = req.body;

    return setParticleStatus(particleId, chargingState)
      .then(resp => {
        const status = resp;
        if (status === 1 && chargingState === 'on') {
          res.json({ status: 'on' });
        } else if (status === 0 && chargingState === 'off') {
          res.json({ status: 'off' });
        }
      })
      .catch(next);
  },
  getDevicesForUser(req, res, next) {
    const { userId } = req.params;
  
    return fetchDevicesForUser(userId)
      .then(result => res.json(result))
      .catch(next);
  },
  addDevice(req, res, next) {
    return createDevice(req.body)
      .then(result => res.json(result))
      .catch(next);
  },
  updateDevice(req, res, next) {
    const { id } = req.params;
    const { auto } = req.body;

    return updateDeviceAuto(id, auto)
      .then(result => res.json(result))
      .catch(next);
  },
  setOwnership(req, res, next){
    const { deviceId, userId } = req.body;

    return setParticleOwnership(deviceId, userId)
      .then(userId => res.json(userId))
      .catch(next);
  }
};

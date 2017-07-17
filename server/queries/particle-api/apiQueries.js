// import env variables
require('dotenv').config();
// import third-party dependencies
const axios = require('axios');
const querystring = require('querystring');

const URL = 'https://api.particle.io/v1/devices/';

module.exports = {
  getParticleStatus(particleId) {
    return axios.get(`${URL}${particleId}/status`, 
    {headers: {
      'Authorization': 'Bearer ' + process.env.PARTICLE_API,
      'data': process.env.PARTICLE_API
    }})
    .then(function (response) {
      const status = response.data.result
      if (!status){
        return 0
      }
      else if (status){
        return 1
    }})
    .catch(function (error) {
      console.log(error);
    });
  },
  setParticleStatus(particleId, chargingState = 'off') {
    return axios.post(`${URL}${particleId}/pwr`, 
    querystring.stringify({
            access_token: process.env.PARTICLE_API,
            arg: chargingState
    }))
    .then(function (response) {
      const status = response.data.return_value

      if (status === 1){return 1}
      else if (status === 0){return 0}
      else {return 'error'}
    }).catch(function (err) {console.log(err);}
    ); //set auto charge
  }
};

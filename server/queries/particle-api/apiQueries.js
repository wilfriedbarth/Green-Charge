// import env variables
require('dotenv').config();
// import third-party dependencies
const axios = require('axios');
const querystring = require('querystring');

const URL = 'https://api.particle.io/v1/devices/';

module.exports = {
  getParticleStatus(particleId) {
    axios.get(`${URL}${particleId}/status`, 
    {headers: {
      'Authorization': 'Bearer ' + process.env.PARTICLE_API,
      'data': process.env.PARTICLE_API
    }})
    .then(function (response) {
      const status = response.data.result
      if (!status){
        return 'off'
      }
      else if (status){
        return 'on'
    }})
    .catch(function (error) {
      console.log(error);
    });
  },
  setParticleStatus(particleId, chargingState = 'off') {
    axios.post(`${URL}${particleId}/pwr`, 
    querystring.stringify({
            access_token: process.env.PARTICLE_API,
            arg: arg
    }))
    .then(function (response) {
      const status = response.data.return_value
      if (status === 1 && arg === 'on'){return 'on'}
      else if (status === 0 && arg === 'off'){return 'off'}
      else {return 'error'}
    }).catch(function (err) {console.log(err);}
    ); //set auto charge
  }
};

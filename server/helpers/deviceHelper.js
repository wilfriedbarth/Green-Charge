require('dotenv').config();
const axios = require('axios');
const querystring = require('querystring');

exports.getChargeStatus = function(particleId) {
  axios.get(`https://api.particle.io/v1/devices/${particleId}/status`, 
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
}
// set charging on || of, set auto charging on || off
// pass deviceID + command(pwr||auto) + arg ('on' || 'off')
exports.setCharger = function(particleId, arg){
  // set charge on or off
    axios.post(`https://api.particle.io/v1/devices/${particleId}/pwr`, 
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

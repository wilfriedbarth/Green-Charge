require('dotenv').config();
const axios = require('axios');
const querystring = require('querystring')

exports.predictChargeState = function(data) {
  // check that there are at least five records. If there are, 
  // compute average change over past hour and dispatch new
  // chargeState.
  if (data.length >= 4) {
    const dataSlice = data.slice(data.length - 4, data.length + 1);

    function average(data) {
      const sum = data.reduce((sum, val) => sum + val, 0);
      return sum / data.length;
    }

    const carbonIntensities = dataSlice.map(dataPoint => dataPoint.carbonIntensity);
    const carbonIntensityAverage = average(carbonIntensities);
    const carbonIntensitySTD = Math.sqrt(average(carbonIntensities.map(carbonIntensity => {
      let diff = carbonIntensity - carbonIntensityAverage;
      return diff * diff;
    })));

    if (carbonIntensities[-1] - carbonIntensityAverage > carbonIntensitySTD) {

    } else {

    }

  } else {
    // Not enough data to perform predictive analysis
  }
}

exports.dispatchChargeState = function() {

}

exports.getChargeStatus = function(deviceId) {
  axios.get(`https://api.particle.io/v1/devices/${deviceId}/status`, 
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
// pass deviceID + arg 'on' || 'off'
exports.setChargeStatus = function(deviceId, arg){
  axios.post(`https://api.particle.io/v1/devices/${deviceId}/pwr`, 
    querystring.stringify({
            access_token: process.env.PARTICLE_API,
            arg: arg
    }))
    .then(function (response) {
      const status = response.data.return_value
      if (status === 1 && arg === 'on'){
        return 'on'
      } else if (status === 0 && arg === 'off'){
        return 'off'
      } else {
        return 'error'
    }})
    .catch(function (error) {
      console.log(error);
    });
}
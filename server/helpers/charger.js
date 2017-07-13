require('dotenv').config();
const axios = require('axios');
const querystring = require('querystring')
const Device = require('../models/Device');

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

exports.getChargeStatus = function(deviceId, cmd) {

  if (cmd === 'status'){
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
  } else if (cmd === 'auto'){
    Device.where({ deviceId }).findOne( function (err, doc) {
      if (err){console.log(err);}
      return doc.auto

    })
  } else {
    return console.log('bad getChargeStatus')
  }
 }
// set charging on || of, set auto charging on || off
// pass deviceID + command(pwr||auto) + arg ('on' || 'off')
exports.setCharger = function(deviceId, cmd, arg){
  // set charge on or off
  if (cmd === 'pwr'){
    axios.post(`https://api.particle.io/v1/devices/${deviceId}/${cmd}`, 
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
    );} //set auto charge
  else if (cmd === 'auto' && (arg === true || arg === false)) {
    Device.findOneAndUpdate( { device: deviceId },
     { $set: { auto: arg}}, function (err,doc){
      if (err){return console.log(err);}
      else if (doc === null){return console.log('no record found');}
      else {return}
    })}
  else {return console.log('bad setCharger request');}
}
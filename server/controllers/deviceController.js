require('dotenv').config();
const axios = require('axios');

// local dependencies
const User = require('../models/User');

// get device status
exports.getStatus = function(req, res, next) {

  //const userDevice = 

  axios.get(`https://api.particle.io/v1/devices/${userDevice}/status`, 
    {headers: {
      "authorization": process.env.PARTICLE_API
    }})
  .then(function (response) {
    console.log(response);
    res.json({  });
  })
  .catch(function (error) {
    console.log(error);
  });
}

// set device status
exports.setStatus = function(req, res, next) {

  //const userDevice = 

  const arg = req.params.arg // on || off

  axios.post(`https://api.particle.io/v1/devices/${userDevice}/pwr?arg=${arg}`, 
      {headers: {
        "authorization": process.env.PARTICLE_API
      }})
    .then(function (response) {
      console.log(response);
       res.json({  });
    })
    .catch(function (error) {
      console.log(error);
    });

}

var axios = require('axios');

var authCaller = {
  
  authenticate(user) {
    console.log(user.email);
    // TODO
  },

  newUser(user) {
    console.log(user.email);
    // TODO
  }

}

module.exports = authCaller;
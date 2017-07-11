var axios = require('axios');

var authCaller = {
  authenticate(user) {
    console.log(user.email);
    console.log(user.pwd);
    // TODO
  }

}

module.exports = authCaller;
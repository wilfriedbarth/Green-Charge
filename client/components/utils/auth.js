import axios from 'axios';

const authCaller = {
  
  authenticate(user) {
    console.log(user);
    axios.post(`/api/signin`, user).then(function(response) {
      console.log(response);
    });
  },

  newUser(user) {
    axios.post(`/api/signup`, user).then(function(response) {
      console.log(response);
      var token = response.data.token;
      console.log(token);
    });
  }

}

export default authCaller;
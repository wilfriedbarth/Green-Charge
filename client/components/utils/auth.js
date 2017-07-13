import axios from 'axios';

const authCaller = {
  
  signIn(user) {
    return axios.post(`/api/signin`, user)
    .catch(function(error) {
      console.log(error.response.status);
      if(error.response.status.toString().startsWith('4')) {
        console.log('Invalid Login Credentials');
        return Promise.reject(error);
      } else {
        console.log(error.response);
      }
    })
    .then(function(response) {
      // save JWT to local storage
      localStorage.setItem('accessToken', response.data.token);
      return;
    });
  },

  newUser(user) {
    return axios.post(`/api/signup`, user)
    .catch(function(error) {
      console.log(error.response.status);
      if(error.response.status.toString().startsWith('5')) {
        console.log('User Already Exists');
        return Promise.reject(error);
      } else {
        console.log(error.response);
      }
    })
    .then(function(response) {
      // response status 
      const status = response.status;
      // save JWT to local storage
      localStorage.setItem('accessToken', response.data.token);  
      return;
    });
  },

  signOut() {
    localStorage.removeItem('accessToken');
  }

}

export default authCaller;

// TODO: handle login errors
// 500: user already exists 
// 401: no matching user 
import axios from 'axios';

const authCaller = {
  
  signIn(user) {
    return axios.post(`/api/signin`, user).then(function(response) {
      // save JWT to local storage
      localStorage.setItem('accessToken', response.data.token);
      return
    });
  },

  newUser(user) {
    return axios.post(`/api/signup`, user).then(function(response) {
      // save JWT to local storage
      localStorage.setItem('accessToken', response.data.token);  
      return
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
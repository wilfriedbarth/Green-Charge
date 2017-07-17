var axios = require('axios');

module.exports  = {
  getCountryData(countryCode) {
    return axios.get(`/api/countries/${countryCode}`).then(function(response) {
      return response.data;
    });
  },
  signUp({ email, password }) {
    return axios.post('/api/signup', { email, password });
  },
  signIn({ email, password }) {
    return axios.post('/api/signin', { email, password });
  }
};


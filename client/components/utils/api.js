var axios = require('axios');

var apiCaller = {
  getCountryData(countryCode) {
    return axios.get(`/api/countries/${countryCode}`).then(function(response) {
      return response.data;
    });
  }

}

module.exports = apiCaller;
import axios from 'axios';

const apiCaller = {
  getCountryData(countryCode) {
    return axios.get(`/api/countries/${countryCode}`).then(function(response) {
      return response.data;
    });
  }

}

export default apiCaller;
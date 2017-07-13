import axios from 'axios';

const apiCaller = {
  getCountryData(countryCode) {
    return axios.get(`/api/countries/${countryCode}`, headers: {'Authorization': localStorage.getItem('accessToken')}).then(function(response) {
      return response.data;
    });
  }
}

export default apiCaller;
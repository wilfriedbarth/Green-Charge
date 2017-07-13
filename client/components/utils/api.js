import axios from 'axios';

const apiCaller = {
  getCountryData(countryCode) {
    const accessToken = localStorage.getItem('accessToken');
    return axios.get(`/api/countries/${countryCode}`, { 
      headers: {'Authorization': accessToken}
      }).then(function(response) {
      return response.data;
    });
  }
}

export default apiCaller;
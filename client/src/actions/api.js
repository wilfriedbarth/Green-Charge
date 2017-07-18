import axios from 'axios';
import productionData from './productionData';

const apiCaller = {
  getCountryData(countryCode) {
    const accessToken = localStorage.getItem('accessToken');
    return axios.get(`/api/countries/${countryCode}`, { 
      headers: {'Authorization': accessToken}
      }).then(function(response) {
        // get carbon data from response object
        const carbonIntensity = response.data.data.map(obj => (obj.carbonIntensity));
        return carbonIntensity;
    });
  },

   // get static production data from response object
  getProductionData() {
    const production = productionData.map(obj => (obj.production));
    return production;
  },

  // get all devices associated with current user 
  getUserDevices() {
    const accessToken = localStorage.getItem('accessToken');
    return axios.get('/api/devices', {
      headers: {'Authorization': accessToken}
    }).then(function(response) {
      console.log(response.data);
    });
  }
}

export default apiCaller;
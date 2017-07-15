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
  getStaticData() {
    // get production data from response object
    const production = productionData.map(obj => (obj.production));
    return production;
  }
}

export default apiCaller;
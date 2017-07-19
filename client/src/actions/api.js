import axios from 'axios';
import productionData from './productionData';

const apiCaller = {
  getCountryData(countryCode) {
    const accessToken = localStorage.getItem('accessToken');
    return axios.get(`/api/countries/${countryCode}`, { 
      headers: {Authorization: accessToken}
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
      headers: {Authorization: accessToken}
    }).then(function(response) {
      return response.data;
    });
  },
  // add a device to db and set ownership of it to current user 
  addDevice(particleId) {
    const accessToken = localStorage.getItem('accessToken');
    return axios.post('/api/devices/add', {
      particleId: particleId
    }).then(function(response) {
      // get database ID
      const deviceId = response.data._id;
      // set userId on device to current user id 
      return axios.post('/api/devices/own', {
        particleId: particleId
        }, 
        {
          headers: { Authorization: accessToken }
        }).then(function(response) {
          console.log(response);
        return response.data;
      });
    });
  },
  // toggle auto status of device - this is not working, server error 
  toggleAutoCharge(deviceId, auto) {
    return axios.put(`/api/devices/${deviceId}/auto`, {
      auto: auto
    }).then(function(response) {
      return response.data;
    })
  }, 
  
  getStatus(particleId) {
    return axios.get(`/api/devices/${particleId}`).then(function(response) {
      // status is 'on' or 'off'
      if (response.data.status === 'on') {
        return true;
      } else {
        return false;
      }
    });
  }, 

  setStatus(particleId, chargingState) {
    return axios.post(`/api/devices/${particleId}`, {
      chargingState: chargingState
    }).then(function(response) {
      return response.data;
    });
  }
}

// apiCaller.getStatus('440036000447343339373536');
apiCaller.toggleAutoCharge("596e7892c77fb2944566480f", false);


export default apiCaller;

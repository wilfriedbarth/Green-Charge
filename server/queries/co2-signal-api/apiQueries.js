// import environment variables
require('dotenv').config();
// import third-party dependencies
const axios = require('axios');
// import local dependencies
const URL = 'https://api.co2signal.com/v1/latest?countryCode=';

module.exports = {
  /**
   * requestAll() assembles axios GET data requests for each
   * country into an array of promises, which is returned. 
   * @param {array} countries - an array of countries
   * @return {array} - an array of promises containing the
   * data for each country.
   */
	requestAll(countries) {
		let requests = countries.map(country => {
      return axios.get(URL + country, {
        headers: { 'auth-token': process.env.API_KEY }
      });
		});

    return Promise.all(requests.map(request => {
      return request.reflect();
    }));
	},
  /**
   * requestOne() fires axios get request for one country and
   * returns a promise.
   * @param {string} country - country code
   * @return {promise} - a promise containing the data for the
   * country.
   */
  requestOne(country) {
    return axios.get(URL + country, {
      headers: { 'auth-token': process.env.API_KEY }
    });
  }
}

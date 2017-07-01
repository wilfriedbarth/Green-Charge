// import environment variables
require('dotenv').config();
// import third-party dependencies
const axios = require('axios');
// import local dependencies
const countries = require('../config/countryList.js');
const URL = 'https://api.co2signal.com/v1/latest?countryCode=';

module.exports = {
  /**
   * requestAll() assembles axios GET data requests for each
   * country into an array of promises, which is returned. If
   * any one of those requests fails, they all fail.
   * @return {array} - an array of promises containing the
   * data for each country.
   */
	requestAll() {
		let assembled = countries.map(country => {
			return axios.get(URL + country, {
				headers: { 'auth-token': process.env.API_KEY } 
			});
		});

		return axios.all(assembled);
	},
  /**
   * requestOne() returns a promise containing an axios GET
   * request for the specified country.
   * @param {string} country - the country code
   * @return {promise} - a promise containing the data for
   * the country if resolved or an error if rejected.
   */
  requestOne(country) {
    return axios.get(URL + country, {
      headers: { 'auth-token': process.env.API_KEY }
    });
  }
}

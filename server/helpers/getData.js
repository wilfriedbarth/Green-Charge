const axios = require('axios');
require('dotenv').config();
const countries = require('../config/countryList.js');
const URL = 'https://api.co2signal.com/v1/latest?countryCode=';

module.exports = {
	request: function(){
		let assembled = countries.map(country =>{
			axios.get(URL + country, {
				headers: {
					'auth-token':process.env.API_KEY 
				} 
			});
		});

		return axios.all(assembled).then(function(data){
			console.log(data);
		})

	},
	request1: function(){ //TESTING
		
			return axios.get(URL + 'US', {
				headers: {
					'auth-token':process.env.API_KEY 
				} 
			}).then(
			function(data){
				console.log(data)
			}).catch(
			function(error){
				console.log(error);
			});
	}

}

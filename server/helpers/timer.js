// third-party dependencies
const moment = require('moment');
// local dependencies
const countries = require('../config/countryList');
const { updateCountryByCode } = require('../queries/db/countryQueries');
const { requestAll } = require('../queries/co2-signal-api/apiQueries');

function getAndSaveApiData() {
  requestAll(countries)
    .then(requests => {
      return requests.map(request => {
        if (request.isFulfilled()) {
          const { data } = request.value(); 

          const props = {
            countryCode: data.countryCode || null,
            $push: {
              data: {
                datetime: moment().format(),
                carbonIntensity: data.data.carbonIntensity || null,
                exchange: data.data.exchange || null,
                fossilFuelPercentage: data.data.fossilfuelPercentage || null,
                price: data.data.price || null,
                production: data.data.production || null,
                storage: data.data.storage || null
              }
            },
            units: data.units || null
          };

          return updateCountryByCode(
            data.countryCode,
            props
          )
        } else {
          console.log(request.reason());
        }
      });
    })
    .then(countryUpdates => {
      countryUpdates.forEach(countryUpdate => {
        countryUpdate.then(res => console.log(res));
      });
    })
    // log error if requestAll fails
    .catch(err => console.log(err));
}

function timer() {
  getAndSaveApiData();
  //setInterval(saveApiData, 900000);
}

module.exports = timer;

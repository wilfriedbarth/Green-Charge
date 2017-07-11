// third-party dependencies
const moment = require('moment');
// local dependencies
const countries = require('../config/countryList');
const {
  fetchCountryByCode,
  updateCountryByCode
} = require('../queries/db/countryQueries');
const { requestAll } = require('../queries/co2-signal-api/apiQueries');
const { predictChargeState } = require('./charger.js');

/**
 * getAndSaveApiData() hits CO2 Signal API with list of countries we
 * provided and gets the current data for each country. Assuming those
 * are all successful, each of those records are saved/updated to the 
 * database. If there is an error at any point in this process, the error
 * is logged server-side.
 */
function getAndSaveApiData() {
  requestAll(countries)
    .then(requests => {
      return Promise.all(requests.map(request => {
        if (request.isFulfilled()) {
          const { data } = request.value(); 

          const props = {
            countryCode: data.countryCode || null,
            updatedAt: moment().format(),
            $push: {
              data: {
                createdAt: moment().format(),
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
          ).reflect();
        } else {
          console.log(request.reason());
        }
      }));
    })
    .then(requests => {
      console.log('New API Data successfully saved to database!');
      return Promise.all(requests.map(request => {
        if (request.isFulfilled()) {
          const { data } = request.value();

          return predictChargeState(data);
        } else {
          console.log(request.reason());
        }
      }));
    })
    // catch any errors
    .catch(err => console.log(err));
}

/**
 * timer() takes a time delay for start if given and the cycle time
 * for the timer. Timer will call getAndSaveApiData() at the given interval.
 * @param {number} delayStart - time delay for starting timer (in seconds).
 * @param {number} cycleTime - the interval for the timer (in seconds).
 */
function timer(delayStart = 0, cycleTime = 900) {
  // log time to next request (useful for dev purposes)
  console.log(`${delayStart} seconds until next API call!`);
  // set timeout with delay 
  setTimeout(() => {
    getAndSaveApiData();
    // set interval after first call with delay
    setInterval(() => {
      getAndSaveApiData();
    }, cycleTime * 1000);
  }, delayStart * 1000);
}

/**
 * timerInit() initializes timer() in sync with records in the database. A
 * delayStart is provided in accordance with an updated country in the databse.
 * The cycleTime will default to 15 min.
 */
function timerInit() {
  fetchCountryByCode('US')
    .then(request => {
      // if database is empty, start timer
      if (request === null) {
        timer();
      } else {
        // get time that country was last updated with data
        const { updatedAt } = request;

        // get current time
        const currentTime = moment().format();

        // time difference in seconds
        const timeDiff = moment(currentTime).unix() - moment(updatedAt).unix();

        // if time diff is >= 900 seconds (15 min), update record and start timer.
        // (this assumes the server wasn't down for more than 15 min. If that is
        // the case, we might want to query for the history and see if we can
        // fill in the blanks...but let's not worry about that for now.)
        if (timeDiff >= 900) {
          timer();
        // if time diff is < 900 seconds (15 min), start timer with remaining time
        // until next update and then update every 15 min.
        } else {
          timer((900 - timeDiff));
        }
      } 
    })
    // log error if fetchCountryByCode fails
    .catch(err => console.log(err));
}


module.exports = timerInit;

const { updateDevicesByCountry } = require('../queries/db/deviceQueries');
 
function predictChargeState(countryCode, data, sampleSize = 2, sensitivity = 0.25) {
  // check that there are at least five records. If there are, 
  // compute average change over past hour and dispatch new
  // chargeState.
  if (data.length >= sampleSize) {
    // get last four data points
    const dataSlice = data.slice(data.length - sampleSize, data.length + 1);

    // create a function to compute average
    function average(data) {
      const sum = data.reduce((sum, val) => sum + val, 0);
      return sum / data.length;
    }

    // get carbon intensities in data slice
    const carbonIntensities = dataSlice.map(dataPoint => dataPoint.carbonIntensity);
    // return null (no charge state change) if any carbon intensity is null
    if (carbonIntensities.indexOf(null) > -1) {
      return dispatchChargeState(countryCode, null);
    }
    // compute average of carbon intensities in data slice
    const carbonIntensityAverage = average(carbonIntensities);
    // compute STD of carbon intensities in data slice
    const carbonIntensitySTD = Math.sqrt(average(carbonIntensities.map(carbonIntensity => {
      let diff = carbonIntensity - carbonIntensityAverage;
      return diff * diff;
    })));

    console.log(carbonIntensitySTD);


    if (Math.abs(carbonIntensities[-1] - carbonIntensityAverage) > carbonIntensitySTD * sensitivity) {
      if (carbonIntensities[-1] - carbonIntensityAverage > 0) {
        // if carbonIntensity is increasing, set charge state to false
        console.log('second');
        return dispatchChargeState(countryCode, false);
      } else if (carbonIntensities[-1] - carbonIntensityAverage < 0) {
        // if carbonIntensity is decreasing, set charge state to true
        console.log('third');
        return dispatchChargeState(countryCode, true);
      }
    } else {
      // if carbon intensity of last data point is within STD, set charge state
      // to null (no change)
      return dispatchChargeState(countryCode, null);
    }

  } else {
    // Not enough data to perform predictive analysis, so return null to
    // indicate no charge state change.
    return dispatchChargeState(countryCode, null);
  }
}

function dispatchChargeState(countryCode, chargeState = null) {
  /*
  if (chargeState !== null) {
    updateDevicesByCountry(countryCode, { chargingStatus: chargeState })
      .catch(err => console.log(err));
  }
  */
}

module.exports = {
  predictChargeState,
  dispatchChargeState
};

 
exports.predictChargeState = function(data) {
  // check that there are at least five records. If there are, 
  // compute average change over past hour and dispatch new
  // chargeState.
  if (data.length >= 4) {
    const dataSlice = data.slice(data.length - 4, data.length + 1);

    function average(data) {
      const sum = data.reduce((sum, val) => sum + val, 0);
      return sum / data.length;
    }

    const carbonIntensities = dataSlice.map(dataPoint => dataPoint.carbonIntensity);
    const carbonIntensityAverage = average(carbonIntensities);
    const carbonIntensitySTD = Math.sqrt(average(carbonIntensities.map(carbonIntensity => {
      let diff = carbonIntensity - carbonIntensityAverage;
      return diff * diff;
    })));

    if (carbonIntensities[-1] - carbonIntensityAverage > carbonIntensitySTD) {

    } else {

    }

  } else {
    // Not enough data to perform predictive analysis
  }
}

exports.dispatchChargeState = function() {

}

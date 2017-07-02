const mongoose = require('mongoose');
const { Schema } = mongoose; 

// create subdocument schema for data
const dataSchema = new Schema({
  datetime: Date,
  carbonIntensity: Number,
  exchange: [{ countryCode: String, exchange: Number }],
  fossilFuelPercentage: Number,
  price: Number,
  production: {
    biomass: Number,
    coal: Number,
    gas: Number,
    hydro: Number,
    nuclear: Number,
    oil: Number,
    solar: Number,
    wind: Number
  },
  storage: {
    hydro: Number
  }
});

// create document schema for country
const countrySchema = new Schema({
  countryCode: String,
  data: [ dataSchema ],
  units: {
    carbonIntensity: String,
    exchange: String,
    price: String,
    production: String,
    storage: String
  }
});

module.exports = mongoose.model('Country', countrySchema);

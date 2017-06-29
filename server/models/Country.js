const { Schema } = require("mongoose");

var countrySchema = new Schema({
  countryCode: String,
  data: [
    {
      carbonIntensity: Number,
      datetime: Date,
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
    }
  ],
  units: {
    carbonIntensity: String,
    exchange: String,
    price: String,
    production: String,
    storage: String
  }
});

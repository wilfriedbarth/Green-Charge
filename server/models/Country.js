const mongoose = require('mongoose');
const { Schema } = mongoose; 

// create subdocument schema for data
const dataSchema = new Schema({
  createdAt: Date,
  carbonIntensity: Number,
  exchange: { type: Schema.Types.Mixed },
  fossilFuelPercentage: Number,
  price: Number,
  production: { type: Schema.Types.Mixed },
  storage: { type: Schema.Types.Mixed }
});

// create document schema for country
const countrySchema = new Schema({
  updatedAt: Date,
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

module.exports = mongoose.model('Country', countrySchema, 'Country');

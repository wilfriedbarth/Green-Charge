const Country = require('../../models/Country');

module.exports = {
  fetchCountryByCode(code) {
    return Country.findOne({ countryCode: code });
  },
  updateCountryByCode(code, props) {
    return Country.findOneAndUpdate(
      { countryCode: code },
      props,
      { upsert: true }
    );
  }
};

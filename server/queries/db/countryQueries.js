const Country = require('../../models/Country');

module.exports = {
  /**
   * fetchCountryByCode() fetches the data for the associated
   * country in the database.
   * @param {string} code - country code
   * @return {promise} - promise containing fetched data or
   * an error.
   */
  fetchCountryByCode(code) {
    return Country.findOne(
      { countryCode: code }
    ).exec();
  },
  /**
   * updateCountryByCode() updates the country with new data or
   * creates the country with the given data if country is not
   * present.
   * @param {string} code - country code
   * @param {object} props - the properties to update
   * @return {promise} - promise containing fetched data or an
   * error.
   */
  updateCountryByCode(code, props) {
    return Country.findOneAndUpdate(
      { countryCode: code },
      props,
      { upsert: true, new: true }
    ).exec();
  }
};

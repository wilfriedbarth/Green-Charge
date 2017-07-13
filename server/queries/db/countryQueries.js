const Country = require('../../models/Country');

module.exports = {
  /**
   * fetchCountryByCode() fetches the data for the associated
   * country in the database.
   * @param {string} code - country code
   * @return {promise} - promise containing fetched data or
   * an error.
   */
  fetchCountryByCode(countryCode) {
    return Country.findOne(
      { countryCode }
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
  updateCountryByCode(countryCode, props) {
    return Country.findOneAndUpdate(
      { countryCode },
      props,
      { upsert: true, new: true }
    ).exec();
  }
};

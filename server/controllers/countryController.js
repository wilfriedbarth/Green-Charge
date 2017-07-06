// import country queries to be use in country controller
const { fetchCountryByCode } = require('../queries/db/countryQueries');

module.exports = {
  fetch(req, res, next) {
    const { code } = req.params;

    fetchCountryByCode(code)
      .then(data => res.json(data))
      .catch(err => next(err));
  }
};

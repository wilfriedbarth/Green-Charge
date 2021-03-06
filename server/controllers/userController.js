// import user queries to be used in user controller
const {
  fetchUsers,
  fetchUser,
  createUser,
  updateUser,
  deleteUser
} = require('../queries/db/userQueries');
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

module.exports = {
  fetchAll(req, res, next) {
    return fetchUsers()
      .then(users => res.json(users))
      .catch(next);
  },
  fetch(req, res, next) {
    const { id } = req.params;

    return fetchUser(id)
      .then(user => res.json(user))
      .catch(next);
  },
  create(req, res, next) {
    const { email, password } = req.body;

    return createUser({ email, password })
      .then(user => res.json(user))
      .catch(next);
  },
  update(req, res, next) {
    const { id } = req.params;
    const { email, password } = req.body;

    return updateUser(id, { email, password })
      .then(user => res.json(user))
      .catch(next);
  },
  delete(req, res, next) {
    const { id } = req.params;

    return deleteUser(id)
      .then(user => res.json(user))
      .catch(next);
  },
};

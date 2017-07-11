require('dotenv').config();
// third-party dependencies
const jwt = require('jsonwebtoken');

// local dependencies
const User = require('../models/User');

// create a token for a user
function tokenForUser(user) {
  return 'JWT ' + jwt.sign({ userId: user.id, expiresIn: '5m' }, process.env.JWT_SECRET);
}

// sign in
exports.signIn = function(req, res, next) {
  res.send({ token: tokenForUser(req.user) });
}

// sign up
exports.signUp = function(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password.'});
  }

  const user = new User({ email, password });

  user.save(function(err) {
    if (err) { return next(err) }

    res.json({ token: tokenForUser(user) });
  });
}

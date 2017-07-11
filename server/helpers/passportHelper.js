require('dotenv').config();
// third-party dependencies
const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
// local dependencies
const User = require("../models/User");

// setup options for local strategy
const localOptions = { usernameField: 'email', passwordField: 'password' };

// create local strategy
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify the username and password, call done with user if it is
  // the correct username and password. Otherwise, call done with false.
  User.findOne({ email: email}, function (err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    // compare passwords - is 'password' equal to user.password?
    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }

      return done(null, user);
    });
  });
});

// setup options for JWT strategy
const jwtOptions = {
  jwtFromRequest: extractJwt.fromAuthHeader(),
  secretOrKey: process.env.JWT_SECRET
};

// create JWT strategy
debugger;
const jwtLogin = new jwtStrategy(jwtOptions, (jwtPayload, done) => {
  User.findById(jwtPayload.userId, (err, user) => {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// tell Passport to use strategies
passport.use(jwtLogin);
passport.use(localLogin);

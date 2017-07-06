// third-party dependencies
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
// local dependencies
const User = require("../models/User");

// create local strategy

// setup options for JWT strategy
const jwtOptions = {
  jwtFromRequest = extractJwt.fromAuthHeader(),
  secretOrKey: process.env.JWT_SECRET
};

// create JWT strategy
const jwtLogin = new jwtStrategy(jwtOptions, (jwtPayload, done) => {
  User.findOne({ id: jwtPayload.sub }, (err, user) => {
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

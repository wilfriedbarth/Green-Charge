const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");


module.exports = function(passport) {
	let options = {};
	options.jwtFromRequest = extractJwt.fromAuthHeader();
	options.secretOrKey = process.env.JWT_SECRET;
	passport.use(new jwtStrategy(options, function(jwt_payload, done) {
		User.findOne({ id: jwt_payload.id }, function(err, user) {
			if (err) {
				return done(err, false);
			}
			if (user) {
				done(null, user);
			} else {
				done(null, false);
			}
		});
	}));
};

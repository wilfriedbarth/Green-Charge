const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose; 

const userSchema = new Schema({
  username: String,
  email: { type: String, unique: true, lowercase: true, trim: true }, 
  password:   String,
  countryCode: { type: String, uppercase: true },
  device: { type: Number, unique: true, trim: true }
});

userSchema.pre('save', function (next) {
 let user = this;
	if (this.isModified('password') || this.isNew){
	 	bcrypt.genSalt(10, function (err, salt) {
	 		if (err){
	 			return next(err);
	 		}
	 		bcrypt.hash(user.password, salt, function(err, hash){
	 			if (err) {
	 				return next(err);
	 			}
	 			user.password = hash;
	 			next();
	 		});
	 	});
	} else {
		return next();
	}
});

userSchema.methods.comparePassword = function (pw,cb){
	bcrypt.comparePassword(pw, this.password, function (err,isMatch){
		if (err) {
			return cb(err);
		}
		cb(null, isMatch);
	});
}

module.exports = mongoose.model('User', userSchema, 'User');
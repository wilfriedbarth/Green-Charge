const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose; 

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true, trim: true }, 
  password:   String,
  countryCode: { type: String, uppercase: true },
  device: [{ type: Number, ref: 'Device' }]
});

// on save hook, encrypt password
// before saving a model, run this function
userSchema.pre('save', function (next) {
  // get access to user model
  const user = this;
   
  // generate a salt, then run callback
	if (this.isModified('password') || this.isNew){
	 	bcrypt.genSalt(10, function (err, salt) {
	 		if (err){
	 			return next(err);
	 		}
      
      // hash (encrypt) a password using a salt
	 		bcrypt.hash(user.password, salt, function(err, hash){
	 			if (err) {
	 				return next(err);
	 			}
        
        // overwrite plain text password with encrypted password
	 			user.password = hash;
	 			return next();
	 		});
	 	});
	} else {
		return next();
	}
});

userSchema.methods.comparePassword = function (pw, cb){
	bcrypt.compare(pw, this.password, function (err, isMatch){
		if (err) { return cb(err); }
		cb(null, isMatch);
	});
}

module.exports = mongoose.model('User', userSchema, 'User');

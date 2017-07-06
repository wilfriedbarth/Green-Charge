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

  },
  fetch(req, res, next) {

  },
  create(req, res, next) {
    let regUser = new User({
      username: req.body.username,
      email: req.body.email, 
      password: req.body.password,
      countryCode: req.body.CountryCode
    });
    regUser.save(function(err){
      if (err){
        return res.json({success:false, message: 'error'});
      }
      res.json({ success: true, message: 'registered user'});
    });
  },
  update(req, res, next) {

  },
  delete(req, res, next) {

  },
  authenticate(req, res, next) {
    User.findOne({
      email: req.body.email
    }, function(err,user){
      if (err) throw err;
      if (!user){
        res.send({ success: false, message: 'user not found'});
      } else{
        user.comparePassword(req.body.password, function(err, isMatch){
          if (isMatch && !err){
            let token = jwt.sign(user, process.env.JWT_SECRET,{
              expiresIn: 3600
            });
            res.json({success: true, token: 'JWT ' + token });

           } else { 
            res.send({success: false, message: 'incorrect pasword'});
          }
        });
      }
    });
  }
};

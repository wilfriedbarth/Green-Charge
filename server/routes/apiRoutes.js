// import third-party dependencies
const express = require('express');
const router = express.Router();
const passportHelper = require('../helpers/passportHelper');
const passport = require('passport');

// import local dependencies (controllers)
const countryController = require('../controllers/countryController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const deviceController = require('../controllers/deviceController');

// configure passport middlewares
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

// configure country routes
router.get('/countries/:code', countryController.fetch);

// configure device routes
console.log(deviceController);

//router.put('/devices/:id/auto' /* mongo id */, deviceController.updateDeviceAuto);
router.get('/devices/:particleId', deviceController.getStatus);
router.post('/devices/:particleId', deviceController.setStatus);

// configure user routes
router.get('/users', requireAuth, userController.fetchAll);
router.get('/users/:id', userController.fetch);
//router.get('/users/:id/devices', deviceController.fetchDevicesForUser);
router.get('/users', userController.create);
router.get('/users/:id', userController.update);
router.get('/user/:id', userController.delete);

// configure auth routes
router.post('/signin', requireSignIn, authController.signIn);
router.post('/signup', authController.signUp);

router.get('/account', requireAuth, function(req,res){

})

// configure device routes
module.exports = router;

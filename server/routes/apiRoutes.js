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
router.get('/devices', requireAuth, deviceController.getDevicesForUser);
router.put('/devices/:id/auto' /* mongo id */, deviceController.updateDevice);
router.get('/devices/:particleId', deviceController.getStatus);
router.post('/devices/:particleId', deviceController.setStatus);
router.post('/devices', deviceController.addDevice);
router.post('/devices/:particleId/:userId', deviceController.setOwnership);

// configure auth routes
router.post('/signin', requireSignIn, authController.signIn);
router.post('/signup', authController.signUp);
router.get('/account', requireAuth, function(req,res){
})
router.put('/account', requireAuth, (req, res) => {
});
router.delete('/account', requireAuth, (req, res) => {
});

// configure device routes
module.exports = router;

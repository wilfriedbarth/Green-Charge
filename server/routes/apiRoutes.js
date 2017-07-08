// import third-party dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');

// import local dependencies (controllers)
const countryController = require('../controllers/countryController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// configure passport middlewares
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

// configure country routes
router.get('/countries/:code', countryController.fetch);

// configure user routes
router.get('/users', userController.fetchAll);
router.get('/users/:id', userController.fetch);
router.get('/users', userController.create);
router.get('/users/:id', userController.update);
router.get('/user/:id', userController.delete);

// configure auth routes
router.post('/signin', requireSignIn, authController.signIn);
router.post('/signup', authController.signUp);

router.get('/account', requireAuth, function(req,res){

})

module.exports = router;

// import third-party dependencies
const express = require('express');
const router = express.Router();

// import local dependencies (controllers)
const countryController = require('../controllers/countryController');
const userController = require('../controllers/userController');

// configure country routes
router.get('/countries', countryController.fetchAll);
router.get('/countries/:id', countryController.fetch);
router.get('/countries', countryController.create);
router.get('/countries/:id', countryController.update);
router.get('/countries/:id', countryController.delete);

// configure user routes
router.get('/users', userController.fetchAll);
router.get('/users/:id', userController.fetch);
router.get('/users', userController.create);
router.get('/users/:id', userController.update);
router.get('/user/:id', userController.delete);

module.exports = router;

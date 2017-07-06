// import third-party dependencies
const express = require('express');
const router = express.Router();

// import local dependencies (controllers)
const countryController = require('../controllers/countryController');
const userController = require('../controllers/userController');

// configure country routes
router.get('/countries/:code', countryController.fetch);

// configure user routes
router.get('/users', userController.fetchAll);
router.get('/users/:id', userController.fetch);
router.get('/users', userController.create);
router.get('/users/:id', userController.update);
router.get('/user/:id', userController.delete);

module.exports = router;

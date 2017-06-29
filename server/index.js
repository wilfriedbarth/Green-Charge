// dependencies
require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
const getData = require('./helpers/getData.js');


var PORT = process.env.PORT || 3000;

var app = express();

// import routes for controllers
require('./routes/apiRoutes.js')(app);
require('./routes/index.js')(app);

var Country = require('./models/Country.js');
var User = require('./models/User.js');

mongoose.Promise = Promise;
// Database configuration with mongoose
mongoose.connect( process.env.DB_HOST || 'mongodb://localhost/GreenCharge' );
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
	console.log('Mongoose Error: ', error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
	console.log('Mongoose connection successful.');
});

// start server
app.listen(PORT, function() {
	console.log('App listening on port ' + PORT);
	console.log(process.env.API_KEY)

	getData.request1();
});

// import environment variables
require('dotenv').config();
// import third-party dependencies
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
// import local dependencies
const getData = require('./helpers/getData.js');
const Country = require('./models/Country.js');
const User = require('./models/User.js');
const apiRoutes = require('./routes/apiRoutes');

// set mongoose to use Promise implementation provided by Node
mongoose.Promise = Promise;
// Database configuration with mongoose
mongoose.connect(process.env.DB_HOST || 'mongodb://localhost/GreenCharge');
const db = mongoose.connection;

// Show any mongoose errors
db.on('error', function(error) {
	console.log('Mongoose Error: ', error);
});

// Once logged in to the db through mongoose, log a success message
db.once('open', function() {
	console.log('Mongoose connection successful.');
});
 
// initialize express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(morgan('dev'));

// serve react app only in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
}

// import routes for controllers
app.use('/api', apiRoutes);

// any other routes other than api routes will serve react app in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}
 
// set port
const PORT = process.env.PORT || 3000;

// start server
app.listen(PORT, function() {
	console.log('App listening on port ' + PORT);

	getData.requestAll();
});

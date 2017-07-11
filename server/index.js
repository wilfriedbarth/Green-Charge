// import environment variables
require('dotenv').config();
// import third-party dependencies
global.Promise = require('bluebird');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
// import local dependencies
const timerInit = require('./helpers/timer.js');
const Country = require('./models/Country.js');
const User = require('./models/User.js');
const apiRoutes = require('./routes/apiRoutes');

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

// configure promise to use bluebird
mongoose.Promise = Promise;
// Database configuration with mongoose
if (process.env.NODE_ENV === 'development') {
  mongoose.connect(process.env.MONGODB_URL_DEV);
} else if (process.env.NODE_ENV === 'production') {
  mongoose.connect(process.env.MONGODB_URL_PROD);
}
 
const db = mongoose.connection;
// Show any mongoose errors
db.on('error', function(error) {
  console.log('Mongoose Error: ', error);
});
// Once logged in to the db through mongoose, log a success message
db.once('open', function() {
  console.log('Mongoose connection successful.');
  // start timer when mongoose has successfully connected
  timerInit();
});

// start server
app.listen(PORT, function() {
	console.log('App listening on port ' + PORT);
});

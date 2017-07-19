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
const timerInit = require('./helpers/timeHelper');
const Country = require('./models/Country');
const User = require('./models/User');
const apiRoutes = require('./routes/apiRoutes');
 
// configure mongoose to use bluebird promises
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

// initialize express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(morgan('dev'));
// serve react app only in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}
// import routes for controllers
app.use('/api', apiRoutes);
// configure error handling middleware
app.use((err, req, res, next) => {
  if (err) {
    res.sendStatus(err.status || 500).send({ error: err });
  } else {
    next();
  }
});
// set port
const PORT = process.env.PORT || 3000;

// start server
app.listen(PORT, function() {
	console.log('App listening on port ' + PORT);
});

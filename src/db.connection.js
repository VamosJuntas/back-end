var mongoose = require('mongoose');

var connectionURL = function () {
  var environment = process.env.NODE_ENV || 'test';

  return {
    development: 'mongodb://localhost/vamosjuntas',
    test: 'mongodb://localhost/vamosjuntas_test',
    production: process.env.MONGODB_URI
  }[environment];
};

var open = function (mode) {
  var connection;
  var options = { promiseLibrary: require('q').Promise };

  mongoose.createConnection(connectionURL(), options);
  mongoose.set('Promise', require('q').Promise);
  connection = mongoose.connection;
  connection.on('error', console.error.bind(console, 'connection error:'));
  connection.once('open', console.log.bind(console, 'Connected'));
};

var close = function() {
  mongoose.disconnect();
};

module.exports = {
  open: open,
  close: close
};

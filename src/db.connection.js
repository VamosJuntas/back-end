var mongoose = require('mongoose');

var connectionURL = {
  development: 'mongodb://localhost/vamosjuntas',
  test: 'mongodb://localhost/vamosjuntas_test',
  production: process.env.MONGODB_URI
};

var open = function (mode) {
  var enviroment = process.env.NODE_ENV;
  var connection;

  mongoose.connect(connectionURL[enviroment]);
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

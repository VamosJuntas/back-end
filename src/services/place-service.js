var Place = require('./../domains/report.model');
var Promise = require('q').Promise;

module.exports.create = function(params) {
  return Place.create(params);
}

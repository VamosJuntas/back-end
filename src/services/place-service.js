var Place = require('./../domains/place.model');
var Promise = require('q').Promise;

module.exports.create = function(params) {
  return Place.create(params);
}

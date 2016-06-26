var Place = require('./../domains/place.model');
var Promise = require('q').Promise;

var create = function(params) {
  return Place.findOne(params).then(function(place) {
    place.reports = mergeRisks(place.reports, params);
    Place.create(place);
  }).catch(function(errors) {
    Place.create(params);
  });
};

var mergeRisks = function(riskList, risk) {
  return riskList.concat(risk);
};

module.exports = {
  create: create,
  mergeRisks: mergeRisks
};

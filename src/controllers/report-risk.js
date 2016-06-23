var jsonschema = require('jsonschema');
var schema = require('./schemas/report-risk.json');
var Place = require('../domains/place.model.js');

module.exports = function (request, response, next) {
  if (jsonschema.validate(request.params, schema).valid) {
    Place.create(request.params)
        .then(function() {
          response.send(201);
        }, function() {
          response.send(500);
        });
  } else {
    response.send(400);
  }
  return next();
};

var jsonschema = require('jsonschema');
var schema = require('./schemas/report-risk.json');
var Place = require('../domains/place.model.js');
var placeService = require('../services/place-service.js');

module.exports = function (request, response, next) {
  if (jsonschema.validate(request.params, schema).valid) {
    placeService.create(request.params).then(function() {
      response.send(201);
    }).catch(function(errors){
      response.send(500);
    });
  } else {
    response.send(400);
  }
  return next();
};

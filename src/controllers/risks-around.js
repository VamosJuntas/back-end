var Place = require('../domains/report.model');
var isNumeric = require('is-numeric');

module.exports = function(request, response) {
  if (Object.keys(request.params).length === 0) {
    return response.send(400, 'Invalid params.');
  }

  var longitude = request.params.longitude;
  var latitute = request.params.latitude;
  if (!isNumeric(latitute) || !isNumeric(longitude)) {
    return response.send(400, 'Invalid latitude or longitude.');
  }

  var radiusInKm = 1;
  var kilometersPerDegree = 111.2;
  Place.find({
    loc: {
      $near: [longitude, latitute],
      $maxDistance: radiusInKm / kilometersPerDegree
    }
  }).exec(function(err, places) {
    if (err) {
      return console.error(err);
    }

    if (places.length === 0) {
      return response.send(204);
    }

    return response.send(places);
  });
};

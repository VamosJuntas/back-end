var Place = require('./../domains/place.model');

var create = function(data) {
  var newPlace = convertRequestDataIntoPlace(data);
  return Place.create(newPlace);
};

var convertRequestDataIntoPlace = function(requestData) {
  return {
    geolocation: [requestData.location.longitude, requestData.location.latitude],
    address: requestData.address,
    category: requestData.risk,
    date: requestData.date
  };
};

module.exports = {
  create: create,
  convertRequestDataIntoPlace: convertRequestDataIntoPlace
};

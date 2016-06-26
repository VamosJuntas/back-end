var Place = require('./../domains/place.model');

var create = function(data) {
  return Place.findOne({"address": data.address}).exec().then(function(place) {
    if (place !== null) {
      var risk = convertRequestDataIntoRisk(data);
      place.reports = mergeRisks(place.reports, risk);
      return Place.create(place);
    }
    else {
      var newPlace = convertRequestDataIntoPlace(data);
      return Place.create(newPlace);
    }
  });
};

var mergeRisks = function(riskList, risk) {
  return riskList.concat(risk);
};

var convertRequestDataIntoRisk = function(requestData) {
  return {
    category: requestData.risk,
    date: requestData.date
  };
};

var convertRequestDataIntoPlace = function(requestData) {
  return {
    loc: [requestData.location.longitude, requestData.location.latitude],
    address: requestData.address,
    reports: convertRequestDataIntoRisk(requestData)
  };
};

module.exports = {
  create: create,
  mergeRisks: mergeRisks,
  convertRequestDataIntoRisk: convertRequestDataIntoRisk,
  convertRequestDataIntoPlace: convertRequestDataIntoPlace
};

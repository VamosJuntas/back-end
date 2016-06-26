var jsonschema = require('jsonschema');
var schema = require('../../../src/controllers/schemas/report-risk.json');
var Place = require('../../../src/domains/place.model.js');
var placeService = require('../../../src/services/place-service.js');
var Promise = require('bluebird');
var reportRisk = require('../../../src/controllers/report-risk.js');

describe('Create a new risk report', function () {
  var restifyMock;

  beforeEach(function() {
    restifyMock = {
      next: jasmine.createSpy(),
      response: jasmine.createSpyObj('response', ['send']),
      request: {
        params: {
          address: "Av. Ipiranga",
          location: {
            latitude: 10,
            longitude: 20
          },
          risk: "Roubo",
          date: "10/10/2016",
          period: "Manhã"
        }
      }
    };
  });

  it('should return 201 when all data is ok', function(done) {
    spyOn(placeService, 'create').andReturn(Promise.resolve());
    reportRisk(restifyMock.request, restifyMock.response, restifyMock.next);
    setTimeout(function() {
      expect(placeService.create).toHaveBeenCalledWith(restifyMock.request.params);
      expect(restifyMock.response.send).toHaveBeenCalledWith(201);
      done();
    }, 0);
  });

  it('should return 400 when param address does not exists', function() {
    restifyMock.request.params.address = undefined;
    reportRisk(restifyMock.request, restifyMock.response, restifyMock.next);
    expect(restifyMock.response.send).toHaveBeenCalledWith(400);
  });

  it('should return 201 after validating with jsonschema', function(done) {
    spyOn(placeService, 'create').andReturn(Promise.resolve());
    spyOn(jsonschema, 'validate').andCallThrough();
    reportRisk(restifyMock.request, restifyMock.response, restifyMock.next);
    setTimeout(function(){
      expect(jsonschema.validate).toHaveBeenCalledWith(restifyMock.request.params, schema);
      expect(restifyMock.response.send).toHaveBeenCalledWith(201);
      done();
    }, 0);
  });

  it('should call Place.create but fail to create a risk', function(done) {
    spyOn(placeService, 'create').andReturn(Promise.reject());
    reportRisk(restifyMock.request, restifyMock.response, restifyMock.next);
      setTimeout(function(){
      expect(placeService.create).toHaveBeenCalledWith(restifyMock.request.params);
      expect(restifyMock.response.send).toHaveBeenCalledWith(500);
      done();
    }, 0);
  });


});

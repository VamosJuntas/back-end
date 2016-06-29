var jsonschema = require('jsonschema');
var schema = require('../../../src/controllers/schemas/report.json');
var Place = require('../../../src/domains/report.model.js');
var placeService = require('../../../src/services/place-service.js');
var Promise = require('q').Promise;
var reportRisk = require('../../../src/controllers/report.js');

describe('Create a new risk report', function () {
  var restifyMock;

  beforeEach(function() {
    restifyMock = {
      next: jasmine.createSpy(),
      response: jasmine.createSpyObj('response', ['send']),
      request: {
        params: {
          geolocation: [10, 20],
          category: "Roubo",
          date: "10/10/2016"
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

  it('should return 400 when param geolocation does not exists', function() {
    restifyMock.request.params.geolocation = undefined;
    reportRisk(restifyMock.request, restifyMock.response, restifyMock.next);
    expect(restifyMock.response.send).toHaveBeenCalledWith(400);
  });

  it('should return 400 when param category does not exists', function() {
    restifyMock.request.params.category = undefined;
    reportRisk(restifyMock.request, restifyMock.response, restifyMock.next);
    expect(restifyMock.response.send).toHaveBeenCalledWith(400);
  });

  it('should return 400 when param date does not exists', function() {
    restifyMock.request.params.date = undefined;
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

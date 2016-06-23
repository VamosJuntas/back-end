var reportRisk = require('../../../src/controllers/report-risk.js');
var jsonschema = require('jsonschema');
var schema = require('../../../src/controllers/schemas/report-risk.json');
var Place = require('../../../src/domains/place.model.js');

describe('Create a new risk report', function () {
  var isPromiseSuccess;
  var promise = {
    then: function(success, error) {
      if(isPromiseSuccess) {
        success();
      }
      error();
    }
  };;

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
    isPromiseSuccess = true;

    spyOn(Place, 'create').andReturn(promise);
  });

  it('should return 201 when all data is ok', function() {
    reportRisk(restifyMock.request, restifyMock.response, restifyMock.next);
    expect(restifyMock.response.send).toHaveBeenCalledWith(201);
  });

  it('should return 400 when param address does not exists', function() {
    restifyMock.request.params.address = undefined;
    reportRisk(restifyMock.request, restifyMock.response, restifyMock.next);
    expect(restifyMock.response.send).toHaveBeenCalledWith(400);
  });

  it('should return 201 after validating with jsonschema', function() {
    spyOn(jsonschema, 'validate').andCallThrough();
    reportRisk(restifyMock.request, restifyMock.response, restifyMock.next);
    expect(jsonschema.validate).toHaveBeenCalledWith(restifyMock.request.params, schema);
    expect(restifyMock.response.send).toHaveBeenCalledWith(201);
  });

  it('should call Place.create and creates a risk with success', function() {
    reportRisk(restifyMock.request, restifyMock.response, restifyMock.next);

    expect(Place.create).toHaveBeenCalledWith(restifyMock.request.params);
    expect(restifyMock.response.send).toHaveBeenCalledWith(201);
  });

  it('should call Place.create but fail to create a risk', function() {
    isPromiseSuccess = false;
    reportRisk(restifyMock.request, restifyMock.response, restifyMock.next);

    expect(Place.create).toHaveBeenCalledWith(restifyMock.request.params);
    expect(restifyMock.response.send).toHaveBeenCalledWith(500);
  });


});

var riskAround = require('../../../src/controllers/risks-around.js');

describe('Create a new risk report', function () {

  beforeEach(function() {
    restifyMock = {
      next: jasmine.createSpy(),
      response: jasmine.createSpyObj('response', ['send']),
      request: {
        params: {}
      }
    };
  });

  it('should return 400 when params does not exist', function() {
    riskAround(restifyMock.request, restifyMock.response, restifyMock.next);
    expect(restifyMock.response.send).toHaveBeenCalledWith(400, 'Invalid params.');
  });


  it('should return 400 when invalid params', function() {
    restifyMock.request.params = {
      latitude: "a",
      longitude:"b"
    };

    riskAround(restifyMock.request, restifyMock.response, restifyMock.next);
    expect(restifyMock.response.send).toHaveBeenCalledWith(400, 'Invalid latitude or longitude.');
  });

});

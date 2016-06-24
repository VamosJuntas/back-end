var restify = require('restify');
var place = require('../../../src/domains/place.model');

describe('App', function () {
  var server, app;
  app = require('../../../src/server.js');

  beforeEach(function () {
    server = createSpyObj('server', ['get', 'post', 'listen', 'use']);
    spyOn(restify, 'createServer').andReturn(server);
    spyOn(restify, 'queryParser').andReturn(jasmine.any(Function));
  });

  describe('start', function () {
    it('should call server use',function() {
      app.start();
      expect(server.use).toHaveBeenCalled();
    });

    it('should call server listen', function () {
      app.start();
      expect(server.listen).toHaveBeenCalled();
    });

    it('should call server get', function () {
      app.start();
      expect(server.get).toHaveBeenCalled();
    });
  });

  describe('/risks-around', function () {
    var risks, request, response;

    beforeEach(function() {
      var mongoResponse;
      mongoResponse = createSpyObj('mongoResponse', ['exec']);
      spyOn(place, 'find').andReturn(mongoResponse);
      app.start();
      risks = server.get.mostRecentCall.args[1];
    });

    it('should call mongo with the correct parameters',function() {
      request = {
        params: {
          longitude: 1.2,
          latitude: 3.4
        }
      };
      risks(request, null);

      expect(place.find).toHaveBeenCalledWith({
        loc: {
          $near: [1.2, 3.4],
          $maxDistance: 100
        }
      });
    });

    it('should return a error when there is no coordinates', function() {
      request = {params: {}};
      response = createSpyObj('response', ['send']);

      risks(request, response);

      expect(response.send).toHaveBeenCalledWith(400, 'Invalid params.');
    });
  });
});

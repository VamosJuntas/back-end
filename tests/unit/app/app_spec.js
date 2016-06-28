var restify = require('restify');
var place = require('../../../src/domains/place.model');

describe('App', function () {
  var server, app;

  beforeEach(function () {
    server = jasmine.createSpyObj('server', ['get', 'post', 'listen', 'use']);
    spyOn(restify, 'createServer').and.returnValue(server);
    spyOn(restify, 'queryParser').and.returnValue(jasmine.any(Function));

    app = require('../../../src/server.js');
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
      mongoResponse = jasmine.createSpyObj('mongoResponse', ['exec']);
      spyOn(place, 'find').and.returnValue(mongoResponse);
      app.start();
      risks = server.get.calls.mostRecent().args[1];
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
      response = jasmine.createSpyObj('response', ['send']);

      risks(request, response);

      expect(response.send).toHaveBeenCalledWith(400, 'Invalid params.');
    });
  });
});

var Place = require('./../../../src/domains/place.model.js');
var placeService = require('./../../../src/services/place-service.js');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var Promise = require('q').Promise;

chai.use(chaiAsPromised);
chai.should();

describe('Place Service', function() {
  var params = {a: 1};

  it('should call Place.create and creates a risk with success', function(done){
    spyOn(Place, 'create').and.returnValue(Promise.resolve());
    placeService.create(params).should.be.fulfilled.and.notify(done);
    expect(Place.create).toHaveBeenCalledWith(params);
  });

  it('should call Place.create and reject when does not create a risk with success', function(done){
    spyOn(Place, 'create').and.returnValue(Promise.reject());
    placeService.create(params).should.be.rejected.and.notify(done);
    expect(Place.create).toHaveBeenCalledWith(params);
  });

});

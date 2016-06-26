var Place = require('./../../../src/domains/place.model.js');
var placeService = require('./../../../src/services/place-service.js');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var Promise = require('q').Promise;

chai.use(chaiAsPromised);
chai.should();

describe('Place Service', function() {
  var params = {a: 1};

  it("should merge risks when a place already exists", function(done){
    spyOn(Place, 'findOne').andReturn(Promise.resolve());
    spyOn(placeService, 'mergeRisks');

    placeService.create(params).should.be.fulfilled.and.notify(done);

    expect(Place.findOne).toHaveBeenCalledWith(params);
  });

  it("should merge risks when a place already exists", function(done){
    spyOn(Place, 'findOne').andReturn(Promise.resolve());
    spyOn(placeService, 'mergeRisks');

    placeService.create(params).should.be.fulfilled.and.notify(done);

    expect(Place.findOne).toHaveBeenCalledWith(params);
  });

  it("should merge risk with a list of risks", function(){
    var risk = {
        category: "Roubo",
        date: "2016-10-22 03:00:00.000Z",
        createdAt: "2016-05-30 22:53:05.491Z"
      };
    var riskList = [
      {
        category: "Roubo",
        date: "2016-10-10 03:00:00.000Z",
        createdAt: "2016-05-30 22:53:05.491Z"
      },
      {
        category: "Local mal-iluminado",
        date: "2016-11-11 03:00:00.000Z",
        createdAt: "2016-05-30 22:53:05.491Z"
      }
    ];
    var expectedList = [
      {
        category: "Roubo",
        date: "2016-10-10 03:00:00.000Z",
        createdAt: "2016-05-30 22:53:05.491Z"
      },
      {
        category: "Local mal-iluminado",
        date: "2016-11-11 03:00:00.000Z",
        createdAt: "2016-05-30 22:53:05.491Z"
      },
      {
        category: "Roubo",
        date: "2016-10-22 03:00:00.000Z",
        createdAt: "2016-05-30 22:53:05.491Z"
      }
    ];

    var risksMerged = placeService.mergeRisks(riskList, risk);
    expect(risksMerged).toEqual(expectedList);
  });

});

var Place = require('./../../../src/domains/place.model.js');
var placeService = require('./../../../src/services/place-service.js');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

describe('Place Service', function() {
  var params = {a: 1};
  var stubFindOne = sinon.stub(Place, 'findOne');

  it("should create a new place with a single risk when a place is not found", function(done){
    stubFindOne.returns(Promise.resolve());

    // placeService.create(params).should.be.fulfilled.and.notify(done);

    // expect(Place.findOne).to.have.been.calledWith(params);
    done();
  });

  it("should merge risks when a place already exists", function(done){
    stubFindOne.reset();
    stubFindOne.returns(Promise.reject());

    // placeService.create(params).should.be.fulfilled.and.notify(done);

    // expect(Place.findOne).to.have.been.calledWith(params);
    done();
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
    expect(risksMerged).to.deep.equal(expectedList);
  });

  it("should convert request data into a risk", function(){
    var requestData = {
          address: "Av. Ipiranga",
          location: {
            latitude: 10,
            longitude: 20
          },
          risk: "Roubo",
          date: "10/10/2016",
          period: "Manhã"
    };
    var expectedRisk = {
      category: "Roubo",
      date: "10/10/2016"
    };

    var risk = placeService.convertRequestDataIntoRisk(requestData);

    expect(risk.category).to.equal(expectedRisk.category);
    expect(risk.date).to.equal(expectedRisk.date);
  });

  it("should convert request data into a new place", function(){
    var requestData = {
          address: "Av. Ipiranga",
          location: {
            latitude: 10,
            longitude: 20
          },
          risk: "Roubo",
          date: "10/10/2016",
          period: "Manhã"
    };
    var expectedPlace = {
        loc: [20, 10],
        address: "Av. Ipiranga",
        reports: [
          {
            category: "Roubo",
            date: "10/10/2016"
          }
        ]
    };

    var newPlace = placeService.convertRequestDataIntoPlace(requestData);

    expect(newPlace.address).to.equal(expectedPlace.address);
  });

});

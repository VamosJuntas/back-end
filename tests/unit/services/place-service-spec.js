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
  beforeEach(function () {
    fakes = sinon.collection;
  });

  afterEach(function () {
    fakes.restore();
  });

  it("should fail to create a new place", function(done){
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
        geolocation: [20, 10],
        address: "Av. Ipiranga",
        category: "Roubo",
        date: "10/10/2016"
    };

    var stubCreate = fakes.stub(Place, 'create');
    stubCreate.returns(Promise.reject());

    placeService.create(requestData).should.be.rejected.and.notify(done);

    expect(Place.create).to.have.been.calledWith(expectedPlace);


  });

  it("should create a new place", function(done){
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
        geolocation: [20, 10],
        address: "Av. Ipiranga",
        category: "Roubo",
        date: "10/10/2016"
    };

    var stubCreate = fakes.stub(Place, 'create');
    stubCreate.returns(Promise.resolve());

    placeService.create(requestData).should.be.fulfilled.and.notify(done);

    expect(Place.create).to.have.been.calledWith(expectedPlace);
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
        geolocation: [20, 10],
        address: "Av. Ipiranga",
        category: "Roubo",
        date: "10/10/2016"
    };

    var newPlace = placeService.convertRequestDataIntoPlace(requestData);

    expect(newPlace.address).to.equal(expectedPlace.address);
  });

});

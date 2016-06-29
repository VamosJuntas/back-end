var frisby = require('frisby');

var risksAroundUrl = 'http://localhost:8080/risks-around';

frisby.create('should have latitude and logitude params')
  .get(risksAroundUrl)
  .expectStatus(400)
  .toss();

frisby.create('should return place if in 1km radius')
  .get(risksAroundUrl + '?latitude=-30.057725&longitude=-51.175642')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .toss();

frisby.create('should return no content if not in 1km radius')
  .get(risksAroundUrl + '?latitude=90&longitude=90')
  .expectStatus(204)
  .toss();

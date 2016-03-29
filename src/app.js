var restify = require('restify');
var database = require('./db.connection');
var Place = require('./place.model');

var server = restify.createServer({
  name: 'VamosJuntas'
});

server.use(restify.queryParser());

server.get('/risks-around',function (request, response) {
  var coords = [];
  coords[0] = request.params.longitude;
  coords[1] = request.params.latitude;
  console.log(coords);
  var maxDistance = 100;

  Place.find({
        loc: {
          $near: coords,
          $maxDistance: maxDistance
        }
      }).exec(function (err, places) {
        if (err) {
          return console.error(err);
        }
        console.log(places);
        return response.send(places);
      });
});



module.exports = {
  start: function () {
    server.listen(8080, function() {
      database.open();
    	console.log('Hello World! :D');
    });
  }
};

var restify = require('restify');
var database = require('./db.connection');
var controllers = require('./controllers');
var port = process.env.VAMOS_JUNTAS_PORT || 8080;
var server;

module.exports = {
  start: function(callback) {

    server = restify.createServer({
      name: 'VamosJuntas'
    }); 

    server.use(restify.queryParser());
    server.use(restify.bodyParser());

    server.get('/risks-around', controllers.risksAround);
    server.post('/report-risk', controllers.reportRisk);

    server.listen(port, function() {
      database.open();
      console.log('VamosJuntas started in port %d', port);
      //callback to call when the server is ready
      if(callback) {
        callback();
      }
    });
  },

  close: function() {
    server.close();
    process.exit(0);
  }
};

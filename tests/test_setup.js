var MongoClient = require('mongodb').MongoClient;

var enviroment = process.env.NODE_ENV || 'test';
var connectionURL = {
  test: 'mongodb://localhost/vamosjuntas_test',
  app: 'mongodb://localhost/vamosjuntas'
};

MongoClient.connect(connectionURL[enviroment], function(error, db) {
  if (error) {
    console.log('error mongo');
  } else {
    var places = [{
      loc: [-51.196491, -30.042510],
      address: 'Rua 1',
      reports: [{
        category: 'local deserto',
        date: '2016-03-16T12:41:51.002Z'
      }]
    },
    {
      loc: [-51.209619, -30.059620],
      address: 'Rua 2',
      reports: [{
        category: 'local deserto',
        date: '2016-03-16T12:41:51.002Z'
      }]
    },
    {
      loc: [-51.230576, -30.072586],
      address: 'Rua 3',
      reports: [{
        category: 'local deserto',
        date: '2016-03-16T12:41:51.002Z'
      }]
    },
    {
      loc: [-51.195136, -30.017054],
      address: 'Rua 4',
      reports: [{
        category: 'local deserto',
        date: '2016-03-16T12:41:51.002Z'
      }]
    },
    {
      loc: [-49.549665, -28.688702],
      address: 'Rua 5',
      reports: [{
        category: 'local deserto',
        date: '2016-03-16T12:41:51.002Z'
      }]
    },
    {
      loc: [-51.169215, -30.056248],
      address: 'Av Cristiano Fischer',
      reports: [{
        category: 'local deserto',
        date: '2016-03-16T12:41:51.002Z'
      }]
    }];

    db.collection('places').remove(function() {
      db.collection('places').insert(places, function() {
        db.close();
      });
    });
  }
});

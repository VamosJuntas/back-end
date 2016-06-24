var db = require('../../src/db.connection');
var mongoose = require('mongoose');

describe('db connection', function () {
  describe('open', function () {
    it('connect to vamosjuntas database', function () {
      spyOn(mongoose, 'createConnection');

      db.open();

      expect(mongoose.createConnection).toHaveBeenCalledWith('mongodb://localhost/vamosjuntas_test', jasmine.any(Object));
    });
  });

  describe('close', function () {
    it('disconnect from vamosjuntas database', function () {
      spyOn(mongoose, 'disconnect');

      db.close();

      expect(mongoose.disconnect).toHaveBeenCalled();
    });
  });
});

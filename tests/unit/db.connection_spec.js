var mongoose = require('mongoose');

describe('db connection', function () {
  var db;

  beforeEach(function () {
    spyOn(mongoose, 'createConnection');
    spyOn(mongoose, 'disconnect');
  });

  describe('open', function () {
    beforeEach(function () {
      process.env.MONGODB_URI = 'mongo-production';
      db = require('../../src/db.connection');
    });

    afterEach(function () {
      process.env.MONGODB_URI = undefined;
      process.env.NODE_ENV = undefined;
    });

    describe('production environment', function () {
      it('connect to vamosjuntas database', function () {
        process.env.NODE_ENV = 'production';

        db.open();

        expect(mongoose.createConnection).toHaveBeenCalledWith('mongo-production', jasmine.any(Object));
      });
    });

    describe('development environment', function () {
      it('connect to vamosjuntas database', function () {
        process.env.NODE_ENV = 'development';
        db.open();

        expect(mongoose.createConnection).toHaveBeenCalledWith('mongodb://localhost/vamosjuntas', jasmine.any(Object));
      });
    });

    describe('test environment', function () {
      it('connect to vamosjuntas database', function () {
        process.env.NODE_ENV = 'test';
        db.open();

        expect(mongoose.createConnection).toHaveBeenCalledWith('mongodb://localhost/vamosjuntas_test', jasmine.any(Object));
      });
    });
  });

  describe('close', function () {
    it('disconnect from vamosjuntas database', function () {
      db.close();

      expect(mongoose.disconnect).toHaveBeenCalled();
    });
  });
});

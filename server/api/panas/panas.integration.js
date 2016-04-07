'use strict';

var app = require('../..');
import request from 'supertest';

var newPanas;

describe('Panas API:', function() {

  describe('GET /api/panas', function() {
    var panass;

    beforeEach(function(done) {
      request(app)
        .get('/api/panas')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          panass = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      panass.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/panas', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/panas')
        .send({
          name: 'New Panas',
          info: 'This is the brand new panas!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPanas = res.body;
          done();
        });
    });

    it('should respond with the newly created panas', function() {
      newPanas.name.should.equal('New Panas');
      newPanas.info.should.equal('This is the brand new panas!!!');
    });

  });

  describe('GET /api/panas/:id', function() {
    var panas;

    beforeEach(function(done) {
      request(app)
        .get('/api/panas/' + newPanas._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          panas = res.body;
          done();
        });
    });

    afterEach(function() {
      panas = {};
    });

    it('should respond with the requested panas', function() {
      panas.name.should.equal('New Panas');
      panas.info.should.equal('This is the brand new panas!!!');
    });

  });

  describe('PUT /api/panas/:id', function() {
    var updatedPanas;

    beforeEach(function(done) {
      request(app)
        .put('/api/panas/' + newPanas._id)
        .send({
          name: 'Updated Panas',
          info: 'This is the updated panas!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPanas = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPanas = {};
    });

    it('should respond with the updated panas', function() {
      updatedPanas.name.should.equal('Updated Panas');
      updatedPanas.info.should.equal('This is the updated panas!!!');
    });

  });

  describe('DELETE /api/panas/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/panas/' + newPanas._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when panas does not exist', function(done) {
      request(app)
        .delete('/api/panas/' + newPanas._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});

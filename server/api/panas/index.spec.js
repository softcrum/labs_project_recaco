'use strict';

const proxyquire = require('proxyquire').noPreserveCache();

const panasCtrlStub = {
  create: 'panasCtrl.create',
  destroy: 'panasCtrl.destroy',
  index: 'panasCtrl.index',
  show: 'panasCtrl.show',
  update: 'panasCtrl.update'
};

const routerStub = {
  delete: sinon.spy(),
  get: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  put: sinon.spy()
};

const panasIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './panas.controller': panasCtrlStub
});

describe('Panas API Router:', function() {
  it('should return an express router instance', function() {
    panasIndex.should.equal(routerStub);
  });
  describe('GET /api/panas', function() {
    it('should route to panas.controller.index', function() {
      routerStub.get
        .withArgs('/', 'panasCtrl.index')
        .should.have.been.calledOnce;
    });
  });
  describe('GET /api/panas/:id', function() {
    it('should route to panas.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'panasCtrl.show')
        .should.have.been.calledOnce;
    });
  });
  describe('POST /api/panas', function() {
    it('should route to panas.controller.create', function() {
      routerStub.post
        .withArgs('/', 'panasCtrl.create')
        .should.have.been.calledOnce;
    });
  });
  describe('PUT /api/panas/:id', function() {
    it('should route to panas.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'panasCtrl.update')
        .should.have.been.calledOnce;
    });
  });
  describe('PATCH /api/panas/:id', function() {
    it('should route to panas.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'panasCtrl.update')
        .should.have.been.calledOnce;
    });
  });
  describe('DELETE /api/panas/:id', function() {
    it('should route to panas.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'panasCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});

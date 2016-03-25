'use strict';

describe('Component: AboutContactComponent', function() {
  beforeEach(module('projectRecacoApp'));
  var AboutContactComponent, scope;
  beforeEach(inject(function($componentController, $rootScope) {
    scope = $rootScope.$new();
    AboutContactComponent = $componentController('AboutContactComponent', {
      $scope: scope
    });
  }));
  it('should ...', function() {
    expect(1).toEqual(1);
  });
});

'use strict';

describe('Component: AboutVersionComponent', function() {
  beforeEach(module('projectRecacoApp'));
  var AboutVersionComponent, scope;
  beforeEach(inject(function($componentController, $rootScope) {
    scope = $rootScope.$new();
    AboutVersionComponent = $componentController('AboutVersionComponent', {
      $scope: scope
    });
  }));
  it('should ...', function() {
    expect(1).toEqual(1);
  });
});

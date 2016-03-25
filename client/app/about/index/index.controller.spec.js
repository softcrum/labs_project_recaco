'use strict';

describe('Component: AboutIndexComponent', function() {
  beforeEach(module('projectRecacoApp'));
  var AboutIndexComponent, scope;
  beforeEach(inject(function($componentController, $rootScope) {
    scope = $rootScope.$new();
    AboutIndexComponent = $componentController('AboutIndexComponent', {
      $scope: scope
    });
  }));
  it('should ...', function() {
    expect(1).toEqual(1);
  });
});

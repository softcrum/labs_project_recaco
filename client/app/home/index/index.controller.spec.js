'use strict';

describe('Component: HomeIndexComponent', function() {
  beforeEach(module('projectRecacoApp'));
  var HomeIndexComponent, scope;
  beforeEach(inject(function($componentController, $rootScope) {
    scope = $rootScope.$new();
    HomeIndexComponent = $componentController('HomeIndexComponent', {
      $scope: scope
    });
  }));
  it('should ...', function() {
    expect(1).toEqual(1);
  });
});

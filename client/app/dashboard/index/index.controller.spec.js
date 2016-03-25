'use strict';

describe('Component: DashboardIndexComponent', function() {
  beforeEach(module('projectRecacoApp'));
  var DashboardIndexComponent, scope;
  beforeEach(inject(function($componentController, $rootScope) {
    scope = $rootScope.$new();
    DashboardIndexComponent = $componentController('DashboardIndexComponent', {
      $scope: scope
    });
  }));
  it('should ...', function() {
    expect(1).toEqual(1);
  });
});

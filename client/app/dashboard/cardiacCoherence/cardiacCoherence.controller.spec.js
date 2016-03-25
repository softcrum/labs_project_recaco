'use strict';

describe('Component: DashboardCardiacCoherenceComponent', function() {
  beforeEach(module('projectRecacoApp'));
  var DashboardCardiacCoherenceComponent, scope;
  beforeEach(inject(function($componentController, $rootScope) {
    scope = $rootScope.$new();
    DashboardCardiacCoherenceComponent = $componentController('DashboardCardiacCoherenceComponent', {
      $scope: scope
    });
  }));
  it('should ...', function() {
    expect(1).toEqual(1);
  });
});

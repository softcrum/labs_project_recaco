'use strict';

describe('Component: DashboardPersonComponent', function() {
  beforeEach(module('projectRecacoApp'));
  var DashboardPersonComponent, scope;
  beforeEach(inject(function($componentController, $rootScope) {
    scope = $rootScope.$new();
    DashboardPersonComponent = $componentController('DashboardPersonComponent', {
      $scope: scope
    });
  }));
  it('should ...', function() {
    expect(1).toEqual(1);
  });
});

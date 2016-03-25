'use strict';

describe('Component: DashboardUsersComponent', function() {
  beforeEach(module('projectRecacoApp'));
  var DashboardUsersComponent, scope;
  beforeEach(inject(function($componentController, $rootScope) {
    scope = $rootScope.$new();
    DashboardUsersComponent = $componentController('DashboardUsersComponent', {
      $scope: scope
    });
  }));
  it('should ...', function() {
    expect(1).toEqual(1);
  });
});

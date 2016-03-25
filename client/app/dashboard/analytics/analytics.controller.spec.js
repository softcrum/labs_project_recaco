'use strict';

describe('Component: DashboardAnalyticsComponent', function() {
  beforeEach(module('projectRecacoApp'));
  var DashboardAnalyticsComponent, scope;
  beforeEach(inject(function($componentController, $rootScope) {
    scope = $rootScope.$new();
    DashboardAnalyticsComponent = $componentController('DashboardAnalyticsComponent', {
      $scope: scope
    });
  }));
  it('should ...', function() {
    expect(1).toEqual(1);
  });
});

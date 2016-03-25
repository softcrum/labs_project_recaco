'use strict';

describe('Component: DashboardSettingComponent', function() {
  beforeEach(module('projectRecacoApp'));
  var DashboardSettingComponent, scope;
  beforeEach(inject(function($componentController, $rootScope) {
    scope = $rootScope.$new();
    DashboardSettingComponent = $componentController('DashboardSettingComponent', {
      $scope: scope
    });
  }));
  it('should ...', function() {
    expect(1).toEqual(1);
  });
});

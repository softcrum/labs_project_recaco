'use strict';

describe('Component: ResourcesProjectSummaryComponent', function() {
  beforeEach(module('projectRecacoApp'));
  var ResourcesProjectSummaryComponent, scope;
  beforeEach(inject(function($componentController, $rootScope) {
    scope = $rootScope.$new();
    ResourcesProjectSummaryComponent = $componentController('ResourcesProjectSummaryComponent', {
      $scope: scope
    });
  }));
  it('should ...', function() {
    expect(1).toEqual(1);
  });
});

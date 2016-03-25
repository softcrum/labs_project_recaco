'use strict';

describe('Component: ResourcesIndexComponent', function() {
  beforeEach(module('projectRecacoApp'));
  var ResourcesIndexComponent, scope;
  beforeEach(inject(function($componentController, $rootScope) {
    scope = $rootScope.$new();
    ResourcesIndexComponent = $componentController('ResourcesIndexComponent', {
      $scope: scope
    });
  }));
  it('should ...', function() {
    expect(1).toEqual(1);
  });
});

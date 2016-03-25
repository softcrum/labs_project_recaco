'use strict';

describe('Component: ResourcesInformedConsentComponent', function() {
  beforeEach(module('projectRecacoApp'));
  var ResourcesInformedConsentComponent, scope;
  beforeEach(inject(function($componentController, $rootScope) {
    scope = $rootScope.$new();
    ResourcesInformedConsentComponent = $componentController('ResourcesInformedConsentComponent', {
      $scope: scope
    });
  }));
  it('should ...', function() {
    expect(1).toEqual(1);
  });
});

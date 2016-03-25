'use strict';

describe('Component: ResourcesPrivacyPromiseComponent', function() {
  beforeEach(module('projectRecacoApp'));
  var ResourcesPrivacyPromiseComponent, scope;
  beforeEach(inject(function($componentController, $rootScope) {
    scope = $rootScope.$new();
    ResourcesPrivacyPromiseComponent = $componentController('ResourcesPrivacyPromiseComponent', {
      $scope: scope
    });
  }));
  it('should ...', function() {
    expect(1).toEqual(1);
  });
});

'use strict';

describe('Component: AboutContributorsComponent', function() {
  beforeEach(module('projectRecacoApp'));
  var AboutContributorsComponent, scope;
  beforeEach(inject(function($componentController, $rootScope) {
    scope = $rootScope.$new();
    AboutContributorsComponent = $componentController('AboutContributorsComponent', {
      $scope: scope
    });
  }));
  it('should ...', function() {
    expect(1).toEqual(1);
  });
});

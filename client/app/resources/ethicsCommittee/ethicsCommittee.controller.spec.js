'use strict';

describe('Component: ResourcesEthicsCommitteeComponent', function() {
  beforeEach(module('projectRecacoApp'));
  var ResourcesEthicsCommitteeComponent, scope;
  beforeEach(inject(function($componentController, $rootScope) {
    scope = $rootScope.$new();
    ResourcesEthicsCommitteeComponent = $componentController('ResourcesEthicsCommitteeComponent', {
      $scope: scope
    });
  }));
  it('should ...', function() {
    expect(1).toEqual(1);
  });
});

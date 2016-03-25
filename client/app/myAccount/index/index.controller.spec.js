'use strict';

describe('Component: MyAccountIndexComponent', function() {
  beforeEach(module('projectRecacoApp'));
  var MyAccountIndexComponent, scope;
  beforeEach(inject(function($componentController, $rootScope) {
    scope = $rootScope.$new();
    MyAccountIndexComponent = $componentController('MyAccountIndexComponent', {
      $scope: scope
    });
  }));
  it('should ...', function() {
    expect(1).toEqual(1);
  });
});

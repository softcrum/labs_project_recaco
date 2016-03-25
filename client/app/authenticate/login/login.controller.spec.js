'use strict';

describe('Component: AuthenticateLoginComponent', function() {
  beforeEach(module('projectRecacoApp'));
  var AuthenticateLoginComponent, scope;
  beforeEach(inject(function($componentController, $rootScope) {
    scope = $rootScope.$new();
    AuthenticateLoginComponent = $componentController('AuthenticateLoginComponent', {
      $scope: scope
    });
  }));
  it('should ...', function() {
    expect(1).toEqual(1);
  });
});

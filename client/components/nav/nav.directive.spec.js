'use strict';

describe('Directive: nav', function () {

  // load the directive's module and view
  beforeEach(module('projectRecacoApp'));
  beforeEach(module('components/nav/nav.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<nav></nav>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the nav directive');
  }));
});

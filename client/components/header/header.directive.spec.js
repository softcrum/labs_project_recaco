'use strict';

describe('Directive: header', function () {
  beforeEach(module('projectRecacoApp'));
  beforeEach(module('components/header/header.html'));
  var element, scope;
  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));
  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<header></header>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the header directive');
  }));
});

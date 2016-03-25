'use strict';

describe('Directive: loadingUiRouter', function () {

  // load the directive's module and view
  beforeEach(module('projectRecacoApp'));
  beforeEach(module('components/loading-ui-router/loading-ui-router.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<loading-ui-router></loading-ui-router>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the loadingUiRouter directive');
  }));
});

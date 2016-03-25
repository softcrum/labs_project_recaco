'use strict';

angular.module('projectRecacoApp')
  .directive('loadingUiRouter', function($rootScope, $timeout) {
    return {
      restrict: 'EA',
      templateUrl: 'components/loading-ui-router/loading-ui-router.html',
      link: function(scope) {
        scope.hide = true;
        $rootScope.$on('$stateChangeStart', function(){
          scope.hide = false;
        });
        $rootScope.$on('$stateChangeSuccess', function() {
          $timeout(function() {
            scope.hide = true;
          }, 750);
        });
      }
    };
  });

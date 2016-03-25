'use strict';

(function() {
  function AboutIndexComponent($scope) {
    $scope.message = 'Hello';
  }
  angular.module('projectRecacoApp')
    .component('aboutIndex', {
      controller: AboutIndexComponent,
      templateUrl: 'app/about/index/index.html'
    });
})();

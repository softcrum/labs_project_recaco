'use strict';

(function() {
  function HomeIndexComponent($scope) {
    $scope.message = 'Hello';
  }
  angular.module('projectRecacoApp')
    .component('homeIndex', {
      templateUrl: 'app/home/index/index.html',
      controller: HomeIndexComponent
    });
})();

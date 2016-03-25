'use strict';

(function() {
  function ResourcesIndexComponent($scope) {
    $scope.message = 'Hello';
  }
  angular.module('projectRecacoApp')
    .component('resourcesIndex', {
      controller: ResourcesIndexComponent,
      templateUrl: 'app/resources/index/index.html'
    });
})();

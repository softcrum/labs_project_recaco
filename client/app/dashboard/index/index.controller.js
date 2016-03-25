'use strict';

(function() {
  function DashboardIndexComponent($scope) {
    $scope.message = 'Hello';
  }
  angular.module('projectRecacoApp')
    .component('dashboardIndex', {
      templateUrl: 'app/dashboard/index/index.html',
      controller: DashboardIndexComponent
    });
})();

'use strict';

(function() {
  function DashboardPersonComponent($scope) {
    $scope.message = 'Hello';
  }
  angular.module('projectRecacoApp')
    .component('dashboardPerson', {
      templateUrl: 'app/dashboard/person/person.html',
      controller: DashboardPersonComponent
    });
})();

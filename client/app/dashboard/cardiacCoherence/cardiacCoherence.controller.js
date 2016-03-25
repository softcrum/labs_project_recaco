'use strict';

(function() {
  function DashboardCardiacCoherenceComponent($scope) {
    $scope.message = 'Hello';
  }
  angular.module('projectRecacoApp')
    .component('dashboardCardiacCoherence', {
      templateUrl: 'app/dashboard/cardiacCoherence/cardiacCoherence.html',
      controller: DashboardCardiacCoherenceComponent
    });

})();

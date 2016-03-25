'use strict';

(function() {
  function DashboardUsersComponent($scope) {
    $scope.message = 'Hello';
  }
  angular.module('projectRecacoApp')
    .component('dashboardUsers', {
      templateUrl: 'app/dashboard/users/users.html',
      controller: DashboardUsersComponent
    });
})();

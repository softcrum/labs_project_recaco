'use strict';

(function() {
  function DashboardAnalyticsComponent($scope) {
    $scope.message = 'Hello';
  }
  angular.module('projectRecacoApp')
    .component('dashboardAnalytics', {
      controller: DashboardAnalyticsComponent,
      templateUrl: 'app/dashboard/analytics/analytics.html'
    });
})();

'use strict';

(function() {
  function DashboardSettingComponent($scope) {
    $scope.message = 'Hello';
  }
  angular.module('projectRecacoApp')
    .component('dashboardSetting', {
      templateUrl: 'app/dashboard/setting/setting.html',
      controller: DashboardSettingComponent
    });
})();

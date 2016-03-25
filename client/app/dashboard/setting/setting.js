'use strict';

angular.module('projectRecacoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('DashboardSetting', {
        security: true,
        template: '<dashboard-setting></dashboard-setting>',
        url: '/dashboard/setting'
      });
  });

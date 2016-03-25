'use strict';

angular.module('projectRecacoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('DashboardUsers', {
        security: true,
        template: '<dashboard-users></dashboard-users>',
        url: '/dashboard/users'
      });
  });

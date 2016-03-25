'use strict';

angular.module('projectRecacoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('DashboardAnalytics', {
        security: true,
        template: '<dashboard-analytics></dashboard-analytics>',
        url: '/dashboard/analytics'
      });
  });

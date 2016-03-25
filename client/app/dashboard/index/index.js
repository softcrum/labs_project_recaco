'use strict';

angular.module('projectRecacoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('DashboardIndex', {
        security: true,
        template: '<dashboard-index></dashboard-index>',
        url: '/dashboard'
      });
  });

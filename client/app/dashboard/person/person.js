'use strict';

angular.module('projectRecacoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('DashboardPerson', {
        security: true,
        template: '<dashboard-person></dashboard-person>',
        url: '/dashboard/person'
      });
  });

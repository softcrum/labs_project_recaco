'use strict';

angular.module('projectRecacoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('DashboardCardiacCoherence', {
        security: true,
        template: '<dashboard-cardiac-coherence></dashboard-cardiac-coherence>',
        url: '/dashboard/cardiac_coherence'
      });
  });

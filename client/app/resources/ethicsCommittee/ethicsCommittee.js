'use strict';

angular.module('projectRecacoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('ResourcesEthicsCommittee', {
        template: '<resources-ethics-committee></resources-ethics-committee>',
        url: '/resources/ethics_committee'
      });
  });

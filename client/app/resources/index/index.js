'use strict';

angular.module('projectRecacoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('ResourcesIndex', {
        template: '<resources-index></resources-index>',
        url: '/resources'
      });
  });

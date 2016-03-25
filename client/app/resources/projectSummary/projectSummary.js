'use strict';

angular.module('projectRecacoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('ResourcesProjectSummary', {
        template: '<resources-project-summary></resources-project-summary>',
        url: '/resources/project_summary'
      });
  });

'use strict';

angular.module('projectRecacoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('AboutContributors', {
        template: '<about-contributors></about-contributors>',
        url: '/about/contributors'
      });
  });

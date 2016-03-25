'use strict';

angular.module('projectRecacoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('AboutIndex', {
        template: '<about-index></about-index>',
        url: '/about'
      });
  });

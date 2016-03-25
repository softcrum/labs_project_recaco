'use strict';

angular.module('projectRecacoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('AboutVersion', {
        url: '/about/version',
        template: '<about-version></about-version>'
      });
  });

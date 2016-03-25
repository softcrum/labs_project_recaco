'use strict';

angular.module('projectRecacoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('HomeIndex', {
        url: '/',
        template: '<home-index></home-index>'
      });
  });

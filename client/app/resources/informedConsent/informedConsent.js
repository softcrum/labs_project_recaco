'use strict';

angular.module('projectRecacoApp')
  .config(function($stateProvider) {
    $stateProvider
    .state('ResourcesInformedConsent', {
      template: '<resources-informed-consent></resources-informed-consent>',
      url: '/resources/informed_consent'
      });
  });

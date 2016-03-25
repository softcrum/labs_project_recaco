'use strict';

angular.module('projectRecacoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('ResourcesPrivacyPromise', {
        template: '<resources-privacy-promise></resources-privacy-promise>',
        url: '/resources/privacy_promise'
      });
  });

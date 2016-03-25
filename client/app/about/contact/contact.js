'use strict';

angular.module('projectRecacoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('AboutContact', {
        template: '<about-contact></about-contact>',
        url: '/about/contact'
      });
  });

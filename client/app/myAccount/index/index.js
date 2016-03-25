'use strict';

angular.module('projectRecacoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('MyAccountIndex', {
        security: true,
        template: '<my-account-index></my-account-index>',
        url: '/my_account'
      });
  });

'use strict';

angular.module('projectRecacoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('AuthenticateLogin', {
        url: '/authenticate/login',
        template: '<authenticate-login></authenticate-login>'
      });
  });

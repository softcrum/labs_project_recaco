'use strict';

angular.module('projectRecacoApp.auth',
  [
    'projectRecacoApp.constants',
    'projectRecacoApp.util',
    'ngCookies',
    'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

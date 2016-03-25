'use strict';

angular.module('projectRecacoApp',
  [
    'projectRecacoApp.auth',
    'projectRecacoApp.admin',
    'projectRecacoApp.constants',
    'btford.socket-io',
    'hSweetAlert',
    'ngCookies',
    'ngMaterial',
    'ngResource',
    'ngSanitize',
    'pascalprecht.translate',
    'ui.router',
    'validation.match'
  ])
  .config(function($cookiesProvider, $locationProvider, $translateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/');
    $locationProvider.html5Mode(true);
    $translateProvider.useStaticFilesLoader({
      prefix: 'languages/',
      suffix: '.json'
    });
    $translateProvider.useSanitizeValueStrategy();
  })
  .controller('AppCtrl', function ($scope, $translate, $cookies) {
    $scope.appChangeLanguage = function (key) {
      $translate.use(key);
      $cookies.put('SC_LR-language', key);
    };
  })
  .run(function($cookies, $rootScope, $state, $translate) {
    $rootScope.$on('$stateChangeStart', function(event, toState) {
      if (toState.security && !$cookies.get('SC_LR-user')) {
        $state.transitionTo('AuthenticateLogin');
        event.preventDefault();
      } else if (toState.name === 'AuthenticateLogin' && $cookies.get('SC_LR-user')) {
        $state.transitionTo('DashboardIndex');
        event.preventDefault();
      }
    });
    var defaultLanguage = $cookies.get('SC_LR-language');
    if (defaultLanguage) {
      $translate.use(defaultLanguage);
    } else {
      $translate.use('es');
    }
  });

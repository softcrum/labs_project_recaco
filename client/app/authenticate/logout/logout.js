'use strict';

angular.module('projectRecacoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('AuthenticateLogout', {
        url: '/authenticate/logout?referrer',
        referrer: 'HomeIndex',
        template: '',
        controller: function($filter, $state, Auth, sweet) {
          var referrer = $state.params.referrer || $state.current.referrer || 'HomeIndex';
          var $translate = $filter('translate');
          Auth.logout();
          sweet.show({
            title: $translate('authenticate.logout.success'),
            text: $translate('authenticate.logout.success_description'),
            type: 'success',
            timer: 3000,
            showConfirmButton: false
          });
          $state.go(referrer);
        }
      });
  });


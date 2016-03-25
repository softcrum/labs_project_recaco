'use strict';

(function() {
  function authInterceptor($rootScope, $q, $cookies, $injector, Util) {
    var state;
    return {
      request(config) {
        config.headers = config.headers || {};
        if ($cookies.get('SC_LR-user') && Util.isSameOrigin(config.url)) {
          config.headers.Authorization = 'Bearer ' + $cookies.get('SC_LR-user');
        }
        return config;
      },
      responseError(response) {
        if (response.status === 401) {
          (state || (state = $injector.get('$state'))).go('AuthenticateLogin');
          $cookies.remove('SC_LR-user');
        }
        return $q.reject(response);
      }
    };
  }
  angular.module('projectRecacoApp.auth')
    .factory('authInterceptor', authInterceptor);
})();

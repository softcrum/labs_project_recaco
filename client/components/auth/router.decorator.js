'use strict';

(function() {
  angular.module('projectRecacoApp.auth')
    .run(function($rootScope, $state, Auth) {
      $rootScope.$on('$stateChangeStart', function(event, next) {
        if (!next.authenticate) {
          return;
        }
        if (typeof next.authenticate === 'string') {
          Auth.hasRole(next.authenticate, _.noop).then(has => {
            if (has) {
              return;
            }
            event.preventDefault();
            return Auth.isLoggedIn(_.noop).then(is => {
              $state.go(is ? 'DashboardIndex' : 'AuthenticateLogin');
            });
          });
        } else {
          Auth.isLoggedIn(_.noop).then(is => {
            if (is) {
              return;
            }
            event.preventDefault();
            $state.go('DashboardIndex');
          });
        }
      });
    });
})();

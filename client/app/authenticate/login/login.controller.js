'use strict';

(function() {
  function AuthenticateLoginComponent($filter, $scope, $state, Auth, sweet) {
    var $translate = $filter('translate');
    this.submitForm = function(isValid) {
      if (isValid) {
        Auth.login({email: $scope.authUser, password: $scope.authPass})
          .then(() => {
            sweet.show({
              title: $translate('authenticate.login.success'),
              text: $translate('authenticate.login.success_description'),
              type: 'success',
              timer: 3000,
              showConfirmButton: false
            });
            $state.go('DashboardIndex');
          })
          .catch(err => {
            sweet.show({
              title: $translate('global.error'),
              text: $translate(err.message),
              type: 'error',
              timer: 3000,
              showConfirmButton: false
            });
            if (err.message.search('not_email') >= 0) {
              $scope.authUser = null;
            }
            $scope.authPass = null;
          });
      }
    };
  }
  angular.module('projectRecacoApp')
    .component('authenticateLogin', {
      controller: AuthenticateLoginComponent,
      templateUrl: 'app/authenticate/login/login.html'
    });
})();

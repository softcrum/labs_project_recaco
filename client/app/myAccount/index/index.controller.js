'use strict';

(function() {
  function MyAccountIndexComponent($scope) {
    $scope.message = 'Hello';
  }
  angular.module('projectRecacoApp')
    .component('myAccountIndex', {
      templateUrl: 'app/myAccount/index/index.html',
      controller: MyAccountIndexComponent
    });
})();

'use strict';

(function() {
  function AboutVersionComponent($scope) {
    $scope.message = 'Hello';
  }
  angular.module('projectRecacoApp')
    .component('aboutVersion', {
      controller: AboutVersionComponent,
      templateUrl: 'app/about/version/version.html'
    });
})();

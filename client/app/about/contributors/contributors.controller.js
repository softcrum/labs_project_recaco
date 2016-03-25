'use strict';

(function() {
  function AboutContributorsComponent($scope) {
    $scope.message = 'Hello';
  }
  angular.module('projectRecacoApp')
    .component('aboutContributors', {
      controller: AboutContributorsComponent,
      templateUrl: 'app/about/contributors/contributors.html'
    });
})();

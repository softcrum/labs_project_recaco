'use strict';

(function() {
  function AboutContactComponent($scope) {
    $scope.message = 'Hello';
  }
  angular.module('projectRecacoApp')
    .component('aboutContact', {
      controller: AboutContactComponent,
      templateUrl: 'app/about/contact/contact.html'
    });
})();

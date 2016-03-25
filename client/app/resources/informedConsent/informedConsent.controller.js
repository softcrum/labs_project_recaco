'use strict';

(function() {
  function ResourcesInformedConsentComponent($scope) {
    $scope.message = 'Hello';
  }
  angular.module('projectRecacoApp')
    .component('resourcesInformedConsent', {
      controller: ResourcesInformedConsentComponent,
      templateUrl: 'app/resources/informedConsent/informedConsent.html'
    });
})();

'use strict';

(function() {
  function ResourcesPrivacyPromiseComponent($scope) {
    $scope.message = 'Hello';
  }
  angular.module('projectRecacoApp')
    .component('resourcesPrivacyPromise', {
      controller: ResourcesPrivacyPromiseComponent,
      templateUrl: 'app/resources/privacyPromise/privacyPromise.html'
    });
})();

'use strict';

(function() {
  function ResourcesEthicsCommitteeComponent($scope) {
    $scope.message = 'Hello';
  }
  angular.module('projectRecacoApp')
    .component('resourcesEthicsCommittee', {
      controller: ResourcesEthicsCommitteeComponent,
      templateUrl: 'app/resources/ethicsCommittee/ethicsCommittee.html'
    });
})();

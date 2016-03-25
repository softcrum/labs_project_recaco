'use strict';

(function() {
  function ResourcesProjectSummaryComponent($scope) {
    $scope.message = 'Hello';
  }
  angular.module('projectRecacoApp')
    .component('resourcesProjectSummary', {
      controller: ResourcesProjectSummaryComponent,
      templateUrl: 'app/resources/projectSummary/projectSummary.html'
    });
})();

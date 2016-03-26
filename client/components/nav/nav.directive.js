'use strict';

angular.module('projectRecacoApp')
  .directive('nav', function ($filter) {
    return {
      templateUrl: 'components/nav/nav.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        var $translate = $filter('translate');
        scope.group = attrs.group;
        scope.link = attrs.link;
        scope.nav = [{
          'href': 'HomeIndex',
          'name': $translate('nav.home_index'),
          'menu': [{
            'href': 'HomeIndex',
            'name': $translate('nav.menu_home_index')
          }, {
            'href': 'AboutIndex',
            'name': $translate('nav.menu_about_index')
          }, {
            'href': 'AboutContributors',
            'name': $translate('nav.menu_about_contributors')
          }, {
            'href': 'AboutVersion',
            'name': $translate('nav.menu_about_version')
          }, {
            'href': 'AboutContact',
            'name': $translate('nav.menu_about_contact')
          }]
        }, {
          'href': 'DashboardIndex',
          'name': $translate('nav.dashboard_index')
        }, {
          'href': 'ResourcesIndex',
          'name': $translate('nav.resources_index'),
          'menu': [{
            'href': 'ResourcesIndex',
            'name': $translate('nav.menu_resources_index')
          }, {
            'href': 'ResourcesEthicsCommittee',
            'name': $translate('nav.menu_resources_ethics_committee')
          }, {
            'href': 'ResourcesInformedConsent',
            'name': $translate('nav.menu_resources_informed_consent')
          }, {
            'href': 'ResourcesPrivacyPromise',
            'name': $translate('nav.menu_resources_privacy_promise')
          }, {
            'href': 'ResourcesProjectSummary',
            'name': $translate('nav.menu_resources_project_summary')
          }]
        }];
      }
    };
  });

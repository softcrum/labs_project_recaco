'use strict';

angular.module('projectRecacoApp')
  .directive('menu', function ($filter) {
    return {
      templateUrl: 'components/menu/menu.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        var $translate = $filter('translate');
        scope.active = attrs.active;
        scope.menu = [{
          group: $translate('menu.dashboard'),
          list: [{
            'href': 'DashboardIndex',
            'icon': 'ion-ios-speedometer-outline',
            'name': $translate('menu.dashboard_index')
          }, {
            'href': 'DashboardAnalytics',
            'icon': 'ion-ios-analytics-outline',
            'name': $translate('menu.dashboard_analytics')
          }, {
            'href': 'DashboardCardiacCoherence',
            'icon': 'ion-ios-color-filter-outline',
            'name': $translate('menu.dashboard_cardiac_coherence')
          }, {
            'href': 'DashboardPerson',
            'icon': 'ion-ios-people-outline',
            'name': $translate('menu.dashboard_person')
          }, {
            'href': 'DashboardSetting',
            'icon': 'ion-ios-gear-outline',
            'name': $translate('menu.dashboard_setting')
          }, {
            'href': 'DashboardUsers',
            'icon': 'ion-ios-body-outline',
            'name': $translate('menu.dashboard_users')
          }]
        }, {
          group: $translate('menu.my_account'),
          list: [{
            'href': 'MyAccountIndex',
            'icon': 'ion-ios-paper-outline',
            'name': $translate('menu.my_account_index')
          }, {
            'href': 'AuthenticateLogout',
            'icon': 'ion-log-out',
            'name': $translate('menu.my_account_logout')
          }]
        }];
      }
    };
  });

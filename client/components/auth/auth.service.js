'use strict';

(function() {

  function AuthService($location, $http, $cookies, $q, appConfig, Util, User) {
    var safeCb = Util.safeCb;
    var currentUser = {};
    var userRoles = appConfig.userRoles || [];
    if ($cookies.get('SC_LR-user') && $location.path() !== '/authenticate/logout') {
      currentUser = User.get();
    }
    var Auth = {
      login({email, password}, callback) {
        return $http.post('/auth/local', {
          email: email,
          password: password
        })
          .then(res => {
            $cookies.put('SC_LR-user', res.data.token);
            currentUser = User.get();
            return currentUser.$promise;
          })
          .then(user => {
            safeCb(callback)(null, user);
            return user;
          })
          .catch(err => {
            Auth.logout();
            safeCb(callback)(err.data);
            return $q.reject(err.data);
          });
      },
      logout() {
        $cookies.remove('SC_LR-user');
        currentUser = {};
      },
      createUser(user, callback) {
        return User.save(user,
          function(data) {
            $cookies.put('SC_LR-user', data.token);
            currentUser = User.get();
            return safeCb(callback)(null, user);
          },
          function(err) {
            Auth.logout();
            return safeCb(callback)(err);
          }).$promise;
      },
      changePassword(oldPassword, newPassword, callback) {
        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function() {
          return safeCb(callback)(null);
        }, function(err) {
          return safeCb(callback)(err);
        }).$promise;
      },
      getCurrentUser(callback) {
        if (arguments.length === 0) {
          return currentUser;
        }
        var value = (currentUser.hasOwnProperty('$promise')) ? currentUser.$promise : currentUser;
        return $q.when(value)
          .then(user => {
            safeCb(callback)(user);
            return user;
          }, () => {
            safeCb(callback)({});
            return {};
          });
      },
      isLoggedIn(callback) {
        if (arguments.length === 0) {
          return currentUser.hasOwnProperty('role');
        }
        return Auth.getCurrentUser(null)
          .then(user => {
            var is = user.hasOwnProperty('role');
            safeCb(callback)(is);
            return is;
          });
      },
      hasRole(role, callback) {
        var hasRole = function(r, h) {
          return userRoles.indexOf(r) >= userRoles.indexOf(h);
        };
        if (arguments.length < 2) {
          return hasRole(currentUser.role, role);
        }
        return Auth.getCurrentUser(null)
          .then(user => {
            var has = (user.hasOwnProperty('role')) ?
              hasRole(user.role, role) : false;
            safeCb(callback)(has);
            return has;
          });
      },
      isAdmin() {
        return Auth.hasRole
          .apply(Auth, [].concat.apply(['admin'], arguments));
      },
      getToken() {
        return $cookies.get('SC_LR-user');
      }
    };
    return Auth;
  }
  angular.module('projectRecacoApp.auth')
    .factory('Auth', AuthService);
})();

(function() {
    'use strict';

    var adminSlapNavbar = {
        bindings : {
        },
        controller : function($auth,$state,userService,$scope, $window, permissionService, CONFIG, $rootScope, adminUserService) {
            var vm = this;
            vm.logout = function() {
                $auth.logout();
                $state.go('login');
            };
            $rootScope.$on('SlapAccounUpdated', function (event, user) {
                vm.user = user;
                vm.avatarUrl = CONFIG.api + "/v1/user/avatar/" + user.avatarId;
            });
            $rootScope.$on('avatarUpdated', function (event, id) {
                vm.user.avatarId = id;
                vm.avatarUrl = CONFIG.api + "/v1/user/avatar/" + id;
            });
            // userService.getUser().then(function (user) {
            //     vm.user = angular.copy(userService.user, {});
            //     vm.avatarUrl = CONFIG.api+"/v1/user/avatar/"+user.avatarId;
            // });
            vm.user = userService.getStoredUser();
            vm.avatarUrl = CONFIG.api + "/v1/user/avatar/" + vm.user.avatarId;
            this.logout = function () {
                $auth.logout();
                $window.location.reload();
                $state.go('login');
            }

            vm.userService = userService;
            vm.isAuthenticated = false;
            vm.menus = [];

            vm.isSuperAdmin = function() {
                return vm.user.role === adminUserService.ROLE_ADMIN
            }

            permissionService.getMyAdminMenu().then(function (menus){
                vm.menus = menus;
            })
            userService.getUser().then(function (user) {
                 vm.user = user;
            });

            this.logout = function () {
                $auth.logout();
                $window.location.reload();
                $state.go('login');
            }
            this.isSlapExpert = function() {
                return vm.user.role === adminUserService.ROLE_SLAPEXPERT
            }
            $scope.$watch($auth.isAuthenticated, function(newValue) {
                vm.isAuthenticated = newValue;
            });
        },
        templateUrl : 'admin/components/navbar/slap-navbar.html'
    };

    angular
        .module('adminapp.components')
        .component('adminSlapNavbar', adminSlapNavbar);
}());
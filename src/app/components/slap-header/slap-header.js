(function () {
    'use strict';

    var slapHeader = {
        binding: {
            // step: '='
        },
        controller: function ($auth, $state, userService, $window, $rootScope, CONFIG, stepService) {
            var vm = this;

            // vm.step = $rootScope.stepActive;
            // vm.stepAc = step;

            // $rootScope.$watch($rootScope.stepActive, function (newValue, oldValue) {
            //     vm.step = $rootScope.stepActive;
            //     vm.apply();
            //     console.log(vm.step);
            // });

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
            
            this.selectSLAPyear = function(user) {
                if(user._id == vm.user._id)
                    return;

                userService.selectSLAPyear(user._id)
                .then(function(req){
                    $auth.setToken(req.data.token);
                    // userService.getUser(true).then(function (user) {
                    //     vm.user = user;
                    //     // $state.go('home');
                    // });
                    $window.location.reload();
                    $state.go('home');

                })
            }

            this.canGoToBuild = function() {
                console.log($rootScope.toState.name)
                var buildStates = ['mindset', 'statement', 'idealClient', 'yeargoal', 'actionPlan', 'execute.livingDayToDay', 'execute.tourExecute'];
                var result = true;
                _.each(buildStates, function(state) {
                    if ($rootScope.toState.name.indexOf(state) > -1) {
                        result = false;
                    }
                })
                return result;
            }

            this.canGoToExecute = function() {
                if ($rootScope.toState.name != 'slapExcute.main') {
                    return true;
                }
                else false;
            }

            this.gotoSlapSchool = function() {
                amplitude.getInstance().logEvent('SLAPSCHOOL');
                $state.go('slapSchool');
            }

            this.gotoSlapworld = function() {
                amplitude.getInstance().logEvent('SLAPWORLD');
                $state.go('slapWorld');
            }

            this.gotoMySlap = function() {
                amplitude.getInstance().logEvent('MYSLAP');
                $state.go('mySlap');
            }

            this.gotoPaymentHistory = function() {
                amplitude.getInstance().logEvent('PAYMENTS');
                $state.go('payments');                
            }

            this.getHelp = function() {
                amplitude.getInstance().logEvent('GETHELP');
                $state.go('get-help');                                
            }
        },
        templateUrl: 'components/slap-header/slap-header.html'
    };

    angular
        .module('app.components')
        .component('slapHeader', slapHeader);
}());
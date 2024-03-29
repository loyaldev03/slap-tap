(function () {
    'use strict';

    angular
        .module('app.pages.actionPlan')
        .controller('WhatsHappeningController', WhatsHappeningController);

    function WhatsHappeningController($scope, activeStep, pageService, stepService, $state, $timeout, actionplanService, userService, toaster) {
        $scope.videoUrl = activeStep.videoUrl;

        angular.extend($scope, activeStep.model, {
            forward: true,
            sendData: sendData,
            startDate: {},
            QMonths: [],
            notifications: [],
            monthNames: actionplanService.getMonthLongNames(),
            currentQut: 1,
            saved: false,
            showEventsBox: true,
            impactClientChanged: [false, false, false, false],
            impactBusinessChanged: [false, false, false, false],
            autoExpand: autoExpand,
        });

        $timeout(function(){
            $scope.autoExpand('impact-business');
            $scope.autoExpand('impact-client');
        },0);

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Action Plan');
        if ($scope.data.length == 0) {
            $scope.data = [
                {
                    "impactClient" : "",
                    "impactBusiness" : ""
                },
                {
                    "impactClient" : "",
                    "impactBusiness" : ""
                },
                {
                    "impactClient" : "",
                    "impactBusiness" : ""
                },
                {
                    "impactClient" : "",
                    "impactBusiness" : ""
                },
            ];
        }
        getData();
        function getData() {
            // var urls = _.get($state.current, 'params.prev.sref').split('.');
            var url = 'allMindsetUser';

            stepService.getApiData('yourStatement') //TODO: Think over the dynamics url
                .then(function (response) {
                    if (response && response.status === 200) {
                        $scope.clientName = _.get(response, 'data.yourStatement.fourth', []);
                        var originalData = _.clone($scope.data);
                    }
                });
            // return stepService.getApiData(urls[urls.length - 1])
            stepService.getApiData(url) //TODO: Think over the dynamics url
                .then(function (response) {
                    if (response && response.status === 200) {

                        $scope.startDate = response.data.slapStartDate;
                        $scope.QMonths.push( actionplanService.getNthQuaterMonths($scope.startDate.month, 1));
                        $scope.QMonths.push( actionplanService.getNthQuaterMonths($scope.startDate.month, 2));
                        $scope.QMonths.push( actionplanService.getNthQuaterMonths($scope.startDate.month, 3));
                        $scope.QMonths.push( actionplanService.getNthQuaterMonths($scope.startDate.month, 4));

                        $timeout(function(){
                            $scope.autoExpand('impact-business');
                            $scope.autoExpand('impact-client');
                        },0);
                    }
                });


            url = 'worldAroundYou';

            // return stepService.getApiData(urls[urls.length - 1])
            stepService.getApiData(url) //TODO: Think over the dynamics url
                .then(function (response) {
                    if (response && response.status === 200) {
                        $scope.eventsByMonth = response.data.worldAroundYou.eventsByMonth;
                    }
                });
            stepService.getApiData('whatsHappening') //TODO: Think over the dynamics url
                .then(function (response) {
                    if (response && response.status === 200) {
                        var _data = [
                            {
                                "impactClient" : "",
                                "impactBusiness" : ""
                            },
                            {
                                "impactClient" : "",
                                "impactBusiness" : ""
                            },
                            {
                                "impactClient" : "",
                                "impactBusiness" : ""
                            },
                            {
                                "impactClient" : "",
                                "impactBusiness" : ""
                            },
                        ];
                        $scope.data = _.get(response, 'data.whatsHappening', _data);
                        _.each($scope.data, function(quarterly_data,qID) {
                            if (quarterly_data.impactBusiness) {
                                $scope.impactBusinessChanged[qID] = true;
                            }                            
                            if (quarterly_data.impactClient) {
                                $scope.impactClientChanged[qID] = true;
                            }
                        })
                        var originalData = _.clone($scope.data);
                    }
                });
            userService.getUser().then(function (user) {
                $scope.businessName = user.businessName;
            });
        }

        function sendData(direction) {
            // var resClient = $scope.impactClientChanged.every(function (quaterClientChanges, index) {
            //     return quaterClientChanges;
            // });
            // var resBusiness = $scope.impactBusinessChanged.every(function (quaterBusinessChanges) {
            //     return quaterBusinessChanges;
            // });
            var valid = true;
            _.each($scope.data, function(quarterly_data) {
                valid = valid && (quarterly_data.impactBusiness && quarterly_data.impactBusiness != '') && (quarterly_data.impactClient && quarterly_data.impactClient != '') 
            })

            if (($scope.data.length != 4  || !valid) && direction == 'forward') {
                addNotification($scope.notifications, { name: 'Happenings empty', type: 'error', message: 'You must build your plan for all 4 Quarters before you can go to the next step.', show: true });
                $('body').animate({
                    scrollTop: $("slap-notifications").offset().top
                }, 400);                
                return false;
            }
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();

            var nextprevStep = stepService.getNextAndPrevStep();
            var urls = activeStep.sref.split('.');

            return stepService.sendApiData(urls[urls.length - 1], $scope.data)
                .then(function () {
                    $scope.saved = true;
                    stepService.setRequestApiFlag();
                    if(direction == 'forward')
                        $state.go(nextprevStep.nextStep.sref);
                    else if(direction == 'backward')
                        $state.go(nextprevStep.prevStep.sref);
                });
        }


        $scope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            if ($scope.saved != true) {
                sendData();
            }
        });


        function autoExpand(e) {
            var elements = typeof e === 'object' ? [e.target] : [].slice.call(document.getElementsByClassName(e));
            elements.forEach(function(element){
                var scrollHeight = element.scrollHeight; // replace 60 by the sum of padding-top and padding-bottom
                if (scrollHeight != 0)
                    element.style.height =  scrollHeight + "px";
            });
        }

        function addNotification(notifications, newNotification) {
            var existing = _.find(notifications, {name: newNotification.name});
            if (_.isUndefined(existing)) {
                notifications.push(newNotification);
            } else {
                existing.show = true;
            }

        }

        $scope.checkChanges = function (nthQut, arr) {
            arr[nthQut] = true;
        };



    }
}());

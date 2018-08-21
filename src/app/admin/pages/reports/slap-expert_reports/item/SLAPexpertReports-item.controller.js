(function () {
    'use strict';

    angular
        .module('reports.SLAPexpertReports.module')
        .controller('AdminSLAPExpertReportsItemController', AdminSLAPExpertReportsItemController);
        
    /* @ngInject */
    function AdminSLAPExpertReportsItemController($scope, $state, expertReportService, pageService, allExperts, adminUserService, NgTableParams, $mdToast, $q, Restangular, $mdDialog, $timeout, $rootScope, commonDialogService, $stateParams, toaster, reportService, actionplanService, $window) {
        angular.extend($scope,  {
            report: {},
            reportID: $stateParams.report_id,
            users: allExperts,
            expert: '',
            startDate: '',
            endDate: '',
            buildReport: buildReport,
            getYears: getYears,
            getMonths: getMonths,
            selectedYear: (new Date()).getFullYear(),
            selectedMonth: (new Date()).getMonth() + 1,
        });


        pageService
            .reset()
            .setShowBC(true)
            .addCrumb({name: 'SLAPexpert Reports', path: 'reports.slapexpert.item'})
            .setPageTitle('SLAPexpert Reports');


        $scope.printSlap = function () {
            $window.print();
        };

        function buildReport() {
            $scope.disableButton = true;
            $scope.startDate = new Date($scope.selectedYear, $scope.selectedMonth - 1, 1)
            $scope.endDate = new Date($scope.selectedYear, $scope.selectedMonth, 0)
            if ($scope.expert._id && $scope.startDate && $scope.endDate){
                return expertReportService.post({expertId: $scope.expert._id, from: $scope.startDate, to: $scope.endDate})
                    .then(function (resolve) {
                        $scope.report = resolve.data;
                        if($scope.report){
                            $scope.visibleReport = true;
                            $scope.visibleMess = false;
                        }else {
                            $scope.visibleReport = false;
                            $scope.visibleMess = true;
                        }
                        $scope.disableButton = false;
                    })
                    .catch(function (e) { $scope.disableButton = false; console.log(e);})
            } else { $scope.disableButton = false; }
        }

        function getYears() {
            var years = [];
            for (var i = 2000; i < (new Date()).getFullYear() + 1; i++) {
                years.push(i);
            }
            return years;
        }

        function getMonths() {
            var months = [];
            var limit = ($scope.selectedYear === (new Date()).getFullYear()) ? (new Date()).getMonth() + 1 : 12;
            for (var i = 1; i <= limit; i++) {
                months.push(i);
            }
            return months;
        }


    }

}());
(function () {
    'use strict';

    angular
        .module('reports.partnerReports.module')
        .controller('AdminPartnerReportsItemController', AdminPartnerReportsItemController);

    /* @ngInject */
    function AdminPartnerReportsItemController($scope, $state, partnerReportService, pageService, allPartners, adminUserService, NgTableParams, $mdToast, $q, Restangular, $mdDialog, $timeout, $rootScope, commonDialogService, $stateParams, toaster, reportService, actionplanService, $window) {
        
        angular.extend($scope,  {
            gridData: {
                gridOptions: {data:[]},
                gridActions: {} 
            },            
            dataReady: false,
            report: {},
            reportID: $stateParams.report_id,
            users: allPartners,
            user: adminUserService.getStoredUser(),
            partner: '',
            startDate: '',
            endDate: '',
            buildReport: buildReport,
            selectedYear: (new Date()).getFullYear(),
            getYears: getYears,
            selectedMonth: (new Date()).getMonth() + 1,
            getMonths: getMonths
        });

        pageService
            .reset() 
            .setShowBC(true)
            .addCrumb({name: 'Impact Partner Reports', path: 'reports.partner.item'})
            .setPageTitle('Impact Partner Reports');


        $scope.printSlap = function () {
            $window.print();
        };

        function buildReport() {
            $scope.disableButton = true;
            $scope.dataReady = false;
            var startDate = new Date($scope.selectedYear, $scope.selectedMonth - 1, 1)
            var endDate = new Date($scope.selectedYear, $scope.selectedMonth, 0)
            if ($scope.partner._id && startDate && endDate){
                return partnerReportService.post({partnerId: $scope.partner._id, from: startDate, to: endDate})
                .then(function (resolve) {
                    $scope.report = resolve.data;
                    $scope.gridData = {
                        gridOptions: {
                            // data: $scope.report.slapsters,
                            data: $scope.report,
                            urlSync: false, 
                        },
                        gridActions: {},
                    };
                    if ($scope.report.slapsters)
                        $scope.dataReady = true;
                    if($scope.report != "No reports for this date range."){
                        $scope.visibleReport = true;
                        $scope.visibleMess = false;
                    }else {
                        $scope.visibleReport = false;
                        $scope.visibleMess = true;
                    }
                    $scope.disableButton = false;
                })
                    .catch(function (e) { $scope.disableButton = false;  console.log(e);})
            } else {
                $scope.disableButton = false; 
            }
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
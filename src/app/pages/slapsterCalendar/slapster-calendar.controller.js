(function () {
    'use strict';

    angular
        .module('app.pages.settingsUser')
        .controller('slapsterCalendarController', slapsterCalendarController);

    /* @ngInject */
    function slapsterCalendarController($scope, $mdDialog, $mdToast, $timeout, pageService, toaster, $stateParams, $state, CONFIG, userService, myCalendarService, activityService, adminUserService) {

        angular.extend($scope, {
            schedules: [],
            schedulesGridData: {
                gridOptions: {data:[]},
                gridActions: {}
            },
            dataReady: false,
            isAdmin: false,
            curUser: userService.getStoredUser(),
            searchKeyword: '',

            rebuildSchedules: rebuildSchedules,
            reschedule: reschedule,
            closeDialog: closeDialog,
            submitReschedule: submitReschedule,
            isSlapExpert: isSlapExpert,
        });
        pageService
            .reset()
            .setShowBC(true)
            .addCrumb({ name: 'MyCalendar', path: 'admin.mycalendar' });
        activate();
        function activate() {
            myCalendarService.getSchedules()
            .then(function(schedules) {
                $scope.schedules = schedules;
                $scope.schedulesGridData = {
                    gridOptions: {data: schedules},
                    gridActions: {}
                }
                $scope.dataReady = true;
            });
            var user = userService.getStoredUser()
            if(user.role == 1 || user.role == 3) $scope.isAdmin = true;       
        }

        function reschedule($event, item) {
            if (moment(item.date).diff(moment(), 'days') > 0 && moment(item.date).diff(moment(), 'days') < 30) {
                ForceToReschedule($event, item);
            }
            else {
                openRescheduleDialog($event, item);
            }
        }

        function isAdmin() {

        }

        function ForceToReschedule($event, item) {
            var textContent = $scope.curUser.name + " " + $scope.curUser.lastName + ", We hope that everything is going great! At this time we are unable to reschedule this call automatically at it goes against our current agreement. We ask all SLAPexperts to reschedule calls with a month notice, but if this is an emergency please select continue, if this is not please cancel"
            var confirm = $mdDialog.confirm()
                .title('Do you want to Reschedule Call?')
                .textContent(textContent)
                .ariaLabel('CIN')
                .targetEvent($event)
                .ok('Continue')
                .cancel('Cancel');
        
                $mdDialog.show(confirm).then(function() {
                    openRescheduleDialog($event, item);
                }, function () {
                    closeDialog();
                });            
        }

        function openRescheduleDialog($event, item) {
            var newForm = {
                type: 'Reschedule',
                title: 'SLAPexpert Reschedule',
                extra: {
                    why_rescheduling: '',
                    when_rescheduling: '',
                    sure_rescheduling: '',
                    slapsterId: item.slapsterId,
                    adminId: item.adminId
                },
                notes: '',
                updatedBy: $scope.curUser._id
            };
            
            $scope.formData = newForm;
            
            $mdDialog.show({
                clickOutsideToClose: true,
                targetEvent: $event,
                scope: $scope, 
                preserveScope: true,
                templateUrl: 'admin/components/dialogs/my-calendar-dialog/reschedule-dialog.html',
                controller: 'RescheduleDialogController',
                autoWrap: true
            });
        }

        function submitReschedule($event, form) {
            if(form && form.$invalid) {
                toaster.pop({type: 'error', body: "You cannot finalize this process until all fields are completed.", timeout: 2000});
                vm.buttonDisabled = false;
                return;
            }
            activityService.add($scope.formData)
                .then(function(response){
                    var reschedule_sucess_content = "Thank you for your feedback, our SLAPmanager team will work with “SLAPster name” to reschedule your call at a more convenient time. Please stay tuned! Have a great day.";
                    toaster.pop({type: 'success', body: reschedule_sucess_content, timeout: 5000});       
                });
            $mdDialog.hide($event);
        }

        function closeDialog() {
            $mdDialog.hide();
        }

        function showToast(message) {
            var toast = $mdToast.simple()
            .textContent(message)
            .action('OK')
            .hideDelay(3000)
            .position("bottom right");

            $mdToast.show(toast).then(function(response) {
                if ( response == 'ok' ) {
                    $mdToast.hide();
                }
            });
        }

        function rebuildSchedules() {
            $scope.dataReady = false;
            $timeout(function() {
                var schedules = $scope.schedules.filter(function(schedule) {
                    var text = schedule.name + schedule.lastName + schedule.date;
                    return (text.indexOf($scope.searchKeyword) > -1);
                })
                $scope.schedulesGridData = {
                    gridOptions: {data: schedules},
                    gridActions: {}                
                }
                $scope.dataReady = true;                
            })
        }        

        function isSlapExpert() {
            return $scope.curUser.role === adminUserService.ROLE_SLAPEXPERT
        }
    }
}());
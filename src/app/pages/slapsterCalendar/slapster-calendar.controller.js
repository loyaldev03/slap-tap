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
            noTimeWorkReschedule: noTimeWorkReschedule,
            reschedule: reschedule,
            closeDialog: closeDialog,
            submitReschedule: submitReschedule,
            isSlapExpert: isSlapExpert
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
            if (calcBusinessDays(moment(), moment(item.date)) > 0 && calcBusinessDays(moment(), moment(item.date)) < 5) {
                
                ForceToReschedule($event, item);
            }
            else {
                openRescheduleDialog($event, item);
            }
        }

        function isAdmin() {

        }

        function ForceToReschedule($event, item) {
            var textContent = $scope.curUser.name + " " + $scope.curUser.lastName + ", We hope that everything is going great! At this time we are unable to reschedule this call automatically at it goes against our current terms and conditions. We ask all clients to reschedule calls with a 5 business day notice. Remember that meetings cancelled and or rescheduled within 5 business days are subject to a $50 fee. To continue to reschedule your call please select continue."
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

        function addRescheduleSECallActivity(item) {
            var rescheduleSECallActivity = {
                type: 'Reschedule',
                title: 'SLAPster Reschedule',
                extra: {},
                notes: '',
                userId: $scope.userID
            }
            $scope.formData = missCallForm;            
        }

        function openRescheduleDialog($event, item) {
            myCalendarService.getAvailableDates()
            .then(function(available_dates) {
                var newForm = {
                    type: 'Reschedule',
                    title: 'SLAPster Reschedule',
                    extra: {
                        why_rescheduling: '',
                        when_rescheduling: '',
                        no_times_work_for_me: false,
                        slapsterId: item.slapsterId,
                        adminId: item.adminId
                    },
                    notes: '',
                    updatedBy: $scope.curUser._id
                };
                
                $scope.formData = newForm;
                $scope.available_dates = available_dates;
                $mdDialog.show({
                    clickOutsideToClose: true,
                    targetEvent: $event,
                    scope: $scope, 
                    preserveScope: true,
                    templateUrl: 'components/dialogs/slapster-reschedule-dialog/slapster-reschedule-dialog.html',
                    controller: 'SlapsterRescheduleDialogController',
                    autoWrap: true
                });

            })
        }

        function submitReschedule($event, form) {
            if(form && form.$invalid) {
                toaster.pop({type: 'error', body: "You cannot finalize this process until all fields are completed.", timeout: 2000});
                return;
            }
            if ($scope.formData.extra.when_rescheduling == '') {
                toaster.pop({type: 'error', body: "You cannot finalize this process until all fields are completed.", timeout: 2000});
                return;                
            }
            activityService.add($scope.formData)
                .then(function(response){
                    var reschedule_sucess_content = "Thank you for your feedback, our SLAPmanager team will work with “SLAPster name” to reschedule your call at a more convenient time. Please stay tuned! Have a great day.";
                    toaster.pop({type: 'success', body: reschedule_sucess_content, timeout: 5000});       
                });
            $mdDialog.hide($event);
        }

        function noTimeWorkReschedule($event, form) {
            if(form  && form.$invalid) {
                toaster.pop({type: 'error', body: "You cannot finalize this process until all fields are completed.", timeout: 2000});
                return;
            }
            $scope.formData.extra.no_times_work_for_me = true;
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

        function calcBusinessDays(date1, date2) {
            date1 = moment(date1);
            date2 = moment(date2);
            if (date2.diff(date1, 'days') > 0) {
                var start_date = date1;
                var count = 0;
                while(!start_date.isSame(date2, 'day')) {
                    if (start_date.day() < 5 && start_date.day() > 0) {
                        count += 1;
                    }
                    start_date.add(1, 'days');
                }
                return count;
            }
            else {
                return -1;
            }
        }
        function isSlapExpert() {
            return $scope.curUser.role === adminUserService.ROLE_SLAPEXPERT
        }
    }
}());
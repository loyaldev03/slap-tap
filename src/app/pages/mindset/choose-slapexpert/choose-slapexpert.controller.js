(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('ChooseSlapexpertController', ChooseSlapexpertController);

    /* @ngInject */
    function ChooseSlapexpertController($scope, pageService, activeStep, stepService,$state, $rootScope, mindsetService, CONFIG, myCalendarService, userService) {
        $scope.videoUrl = activeStep.videoUrl;
        angular.extend($scope, activeStep.model, {
            forward: true,
            chosen_slapexperts: [],
            selected_personalities: [],
            current_step: 0,
            current_selected_personality: '',
            current_slapexpert_details: [],
            current_slapexpert_number: 1, 
            slapexpert_current_numbers: [1,2,3,4,5],
            current_user: null,
            available_slots: [],
            available_slots_for_day: [],
            selected_slot: null, 
            isReady: false,

            sendData: sendData,
            isActiveStep: isActiveStep,
            selectPersonality: selectPersonality,   
            isPersonalitySelected: isPersonalitySelected,
            isPersonalityDisabled: isPersonalityDisabled,
            isContinueAvailable: isContinueAvailable,
            moveToNextStep: moveToNextStep,
            changeProfileSwitch: changeProfileSwitch,
            onCarouselInit: onCarouselInit,
            onCarouselBeforeChange: onCarouselBeforeChange,
            onCarouselAfterChange: onCarouselAfterChange,
            getSlapExpertsWithPersonalities: getSlapExpertsWithPersonalities,
            selectSlapExpert: selectSlapExpert,
            changeSlapExpert: changeSlapExpert,
            getLeftSlapExperts: getLeftSlapExperts,
            getRightSlapExperts: getRightSlapExperts,
            getSlapExpertImageUrl: getSlapExpertImageUrl,
            getCurrentNumbers: getCurrentNumbers,
            gotoPrevPage: gotoPrevPage,
            gotoNextPage: gotoNextPage,
            reorderSlapexpertPagination: reorderSlapexpertPagination,
            isPrevDisabled: isPrevDisabled,
            isNextDisabled: isNextDisabled,
            setDayContent: setDayContent,
            dayClick: dayClick,
            getDurationFromSlot: getDurationFromSlot,
            selectSlot: selectSlot,
            isSlotSelected: isSlotSelected,

            saved: false
        });
        
        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('SLAPmindset');

        activate();
        function activate() {
            $scope.personalities = [
                'Tough',
                'Empathetic',
                'Sincere',
                'Direct',
                'Casual',
                'Structured',
                'Business-like',
                'Social',
                'Advisor',
                'Partner'
            ];
            $scope.steps = [
                'SELECT_PERSONALITY',
                'SLAPEXPERT_CHOOSE',
                'SCHEDULE_SLAPEXPERT_CALL',
                'SYNC_WITH_SLAPEXPERT'
            ];
            $scope.getSlapExpertsWithPersonalities();
            $scope.current_user = userService.getStoredUser();
        }
        function sendData(direction) {
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();
            var nextprevStep = stepService.getNextAndPrevStep();
            if(direction == 'forward')  
				$state.go(nextprevStep.nextStep.sref); 
            else if(direction == 'backward')
				$state.go(nextprevStep.prevStep.sref);
            $scope.saved = true;
            
        }
        $scope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            if ($scope.saved != true) {
                sendData();
            }
        });

        stepService.mySlapStateForButton = 'Excute';

        function isActiveStep(step) {
            if (step == 'PERSONALITY_CHOOOSE') {
                return (getCurrentStep().indexOf('SELECT_PERSONALITY') > -1);
            }
            else {
                return (getCurrentStep() == step);
            }
        }

        function selectPersonality(item) {
            // $scope.current_selected_personality = item;
            var index = $scope.selected_personalities.indexOf(item);
            if (index > -1) {
                $scope.selected_personalities.splice(index, 1);
            }
            else if ($scope.selected_personalities.length < 3) {
                $scope.selected_personalities.push(item);                
            }
        }
        
        function isPersonalitySelected(item) {
            return ($scope.current_selected_personality == item || $scope.selected_personalities.indexOf(item) > -1);
        }

        function isPersonalityDisabled(item) {
            return ($scope.selected_personalities.indexOf(item) > -1);
        }

        function getCurrentStep() {
            return $scope.steps[$scope.current_step];
        }

        function moveToNextStep() {
            $scope.current_step += 1;
            if ($scope.current_step == 2) {
                $scope.isReady = false
                myCalendarService.getAvailableSlots($scope.current_user._id, $scope.current_slapexpert.userId)
                .then(function(res) {
                    $scope.available_slots = res.data;
                    $scope.isReady = true;
                })
            }
        }

        function changeProfileSwitch(switch_number) {
            $scope.selected_profile_switch = switch_number;
        }

        function onCarouselInit() {

        }

        function onCarouselBeforeChange() {

        }

        function onCarouselAfterChange() {

        }
        
        function getSlapExpertsWithPersonalities() {
            mindsetService.getSlapExpertsWithPersonalities($scope.selected_personalities)
            .then(function(chosen_slapexperts) {
                $scope.chosen_slapexperts = chosen_slapexperts;
                var max = Math.min(chosen_slapexperts.length, 5);
                $scope.slapexpert_current_numbers = [];
                for (var  i = 1; i <= max; i++) {
                    $scope.slapexpert_current_numbers.push(i);
                }
                $scope.changeSlapExpert(1);          
            });

        }

        function selectSlapExpert() {

        }

        function changeSlapExpert(slapexpert_number) {
            $scope.current_slapexpert = $scope.chosen_slapexperts[slapexpert_number - 1];
            $scope.current_slapexpert_number = slapexpert_number;
            if ($scope.slapexpert_current_numbers[$scope.slapexpert_current_numbers.length - 1] < $scope.current_slapexpert_number) {
                $scope.reorderSlapexpertPagination(true, $scope.current_slapexpert_number);
            }
            if ($scope.slapexpert_current_numbers[0] > $scope.current_slapexpert_number) {
                $scope.reorderSlapexpertPagination(false, $scope.current_slapexpert_number);
            }

            $scope.current_slapexpert_details = [
                {
                    description: $scope.current_slapexpert.brief_bio
                },
                {
                    description: $scope.current_slapexpert.full_bio
                }                
            ];
        }
        
        function getLeftSlapExperts() {
                return $scope.chosen_slapexperts.slice(Math.max(0, $scope.current_slapexpert_number - 6), $scope.current_slapexpert_number - 1).reverse();
        }

        function getRightSlapExperts() {
            return $scope.chosen_slapexperts.slice($scope.current_slapexpert_number, Math.min($scope.current_slapexpert_number+5, $scope.chosen_slapexperts.length)).reverse();
        }

        function getSlapExpertImageUrl(slapexpert) {
            return CONFIG.api + "/v1/user/avatar/" + slapexpert.avatarId; 
        }

        function getCurrentNumbers() {
            return $scope.slapexpert_current_numbers;            
        }

        function gotoPrevPage() {
            $scope.changeSlapExpert(Math.max(1, $scope.current_slapexpert_number - 1));
        }

        function gotoNextPage() {
            $scope.changeSlapExpert(Math.min($scope.chosen_slapexperts.length, $scope.current_slapexpert_number + 1));
        }

        function reorderSlapexpertPagination(max, min_max_number) {
            var min_number = min_max_number;
            if (max) {
                min_number = min_max_number - 4;
            }
            $scope.slapexpert_current_numbers = [];
            for (var i = 0; i < 5; i++) {
                $scope.slapexpert_current_numbers.push(min_number + i);
            }
        }

        function isPrevDisabled() {
            return ($scope.current_slapexpert_number == 1);
        }

        function isNextDisabled() {
            return ($scope.current_slapexpert_number == $scope.chosen_slapexperts.length)
        }

        function isContinueAvailable(step) {
            if (step == 'SELECT_PERSONALITY') {
                return $scope.selected_personalities.length == 3;
            }
            if (step == 'SCHEDULE_SLAPEXPERT_CALL') {
                return $scope.selected_slot != null;
            }
        }

        function setDayContent(date) {
            var selected_date = moment(date);
            $scope.available_slots_for_day = [];
            _.each($scope.available_slots, function(slot) {
                var slot_date = moment(slot.startTime);
                if (slot_date.isSame(selected_date, 'day')) {
                    return '<label color="red">Available</label>';
                }
            });       
            return '<label color="red">Available</label>';
            // var selected_date = moment(date);
            // var slot_date = moment($scope.selected_slot.startTime);
            // if (slot_date.isSame(selected_date, 'day')) {
            //     return '<label color="red">Booked</label>';
            // }
            // else {
            //     return "";
            // }
        }

        function dayClick(date) {
            var selected_date = moment(date);
            $scope.available_slots_for_day = [];
            _.each($scope.available_slots, function(slot) {
                var slot_date = moment(slot.startTime);
                if (slot_date.isSame(selected_date, 'day')) {
                    $scope.available_slots_for_day.push(slot);
                }
            });
        }

        function getDurationFromSlot(slot) {
            return moment(slot.startTime).format("hh:mm:ss") + "-" + moment(slot.endTime).format("hh:mm:ss");
        }

        function selectSlot(slot) {
            $scope.selected_slot = slot;
        }

        function isSlotSelected(slot) {
            return $scope.selected_slot === slot;
        }
    }
}());
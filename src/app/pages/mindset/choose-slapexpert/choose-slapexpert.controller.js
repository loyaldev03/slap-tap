(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('ChooseSlapexpertController', ChooseSlapexpertController);

    /* @ngInject */
    function ChooseSlapexpertController($scope, pageService, activeStep, stepService,$state, $rootScope) {
        $scope.videoUrl = activeStep.videoUrl;
        angular.extend($scope, activeStep.model, {
            forward: true,
            sendData: sendData,
            isActiveStep: isActiveStep,
            selectPersonality: selectPersonality,
            isPersonalitySelected: isPersonalitySelected,
            isPersonalityDisabled: isPersonalityDisabled,
            moveToNextStep: moveToNextStep,
            changeProfileSwitch: changeProfileSwitch,
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
                'SELECT_PERSONALITY1',
                'SELECT_PERSONALITY2',
                'SELECT_PERSONALITY3',
            ];
            $scope.current_selected_personality = '';
            $scope.selected_personalities = [];
            $scope.current_step = 0;
            $scope.selected_profile_switch = 1;
            $scope.links =[
                { src:"http://www.conceptcarz.com/images/Suzuki/suzuki-concept-kizashi-3-2008-01-800.jpg", alt:"", caption:""},
                { src:"http://www.conceptcarz.com/images/Volvo/2009_Volvo_S60_Concept-Image-01-800.jpg", alt:"", caption:""},
                { src:"http://www.sleepzone.ie/uploads/images/PanelImages800x400/TheBurren/General/sleepzone_hostels_burren_800x400_14.jpg", alt:"", caption:""},
            ];            
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
            return (getCurrentStep() == step);
        }

        function selectPersonality(item) {
            $scope.current_selected_personality = item;
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
            $scope.selected_personalities.push($scope.current_selected_personality);
            $scope.current_selected_personality = '';
        }

        function changeProfileSwitch(switch_number) {
            $scope.selected_profile_switch = switch_number;
        }
    }
}());
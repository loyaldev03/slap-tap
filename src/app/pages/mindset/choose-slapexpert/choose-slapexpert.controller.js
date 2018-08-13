(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('ChooseSlapexpertController', ChooseSlapexpertController);

    /* @ngInject */
    function ChooseSlapexpertController($scope, pageService, activeStep, stepService,$state, $rootScope, mindsetService, CONFIG) {
        $scope.videoUrl = activeStep.videoUrl;
        angular.extend($scope, activeStep.model, {
            forward: true,
            chosen_slapexperts: [],
            selected_personalities: [],
            slapexpert_number_array: [],
            current_step: 0,
            current_selected_personality: '',
            current_slapexpert_details: [],
            current_slapexpert_number: 1, 
            slapexpert_current_numbers: [1,2,3,4,5],

            sendData: sendData,
            isActiveStep: isActiveStep,
            selectPersonality: selectPersonality,   
            isPersonalitySelected: isPersonalitySelected,
            isPersonalityDisabled: isPersonalityDisabled,
            moveToNextStep: moveToNextStep,
            changeProfileSwitch: changeProfileSwitch,
            onCarouselInit: onCarouselInit,
            onCarouselBeforeChange: onCarouselBeforeChange,
            onCarouselAfterChange: onCarouselAfterChange,
            getSlapexpertDetails: getSlapexpertDetails,
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
                'SLAPEXPERT_CHOOSE',
                'SYNC_WITH_SLAPEXPERT'
            ];
            $scope.getSlapExpertsWithPersonalities();
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

        function onCarouselInit() {

        }

        function onCarouselBeforeChange() {

        }

        function onCarouselAfterChange() {

        }

        function getSlapexpertDetails() {
            var details = [
                {
                    header: 'Biography',
                    description: "The header lines were kept separate because they looked like mail headers and I have mailmode on.  The same thing applies to Bozo's quoted text.  Mailmode doesn't screw things up very often, but since most people are usually converting non-mail, it's off by default."
                },
                {
                    header: 'Career Highlights',
                    description: 'description'
                    // description: "The header lines were kept separate because they looked like mail headers and I have mailmode on.  The same thing applies to Bozo's quoted text.  Mailmode doesn't screw things up very often, but since most people are usually converting non-mail, it's off by default."
                }                
            ];
            return details;
        }
        
        function getSlapExpertsWithPersonalities() {
            mindsetService.getSlapExpertsWithPersonalities($scope.selected_personalities)
            .then(function(chosen_slapexperts) {
                $scope.chosen_slapexperts = chosen_slapexperts;
                $scope.slapexpert_number_array = [];
                for ( var i = 1; i <= chosen_slapexperts.length; i++) {
                    $scope.slapexpert_number_array.push({
                        number: i,
                        callback: $scope.changeSlapExpert,
                        current_slapexpert_number: $scope.current_slapexpert_number
                    });
                }
                // console.log('------------slapexpert number array---------------', $scope.slapexpert_number_array);
                $scope.current_slapexpert_details = [ 
                    {
                        header: 'Biography',
                        description: "The header lines were kept separate because they looked like mail headers and I have mailmode on.  The same thing applies to Bozo's quoted text.  Mailmode doesn't screw things up very often, but since most people are usually converting non-mail, it's off by default."
                    },
                    {
                        header: 'Career Highlights',
                        description: "The header lines were kept separate because they looked like mail headers and I have mailmode on.  The same thing applies to Bozo's quoted text.  Mailmode doesn't screw things up very often, but since most people are usually converting non-mail, it's off by default."
                    }                
                ];      
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
                    header: 'Biography',
                    description: $scope.current_slapexpert.brief_bio
                },
                {
                    header: 'Career Highlights',
                    description: $scope.current_slapexpert.why_slapexpert
                }                
            ];
        }
        
        function getLeftSlapExperts() {
            return $scope.chosen_slapexperts.slice(Math.max(0, $scope.current_slapexpert_number - 6), $scope.current_slapexpert_number - 1);
        }

        function getRightSlapExperts() {
            return $scope.chosen_slapexperts.slice($scope.current_slapexpert_number, Math.min($scope.current_slapexpert_number+5, $scope.chosen_slapexperts.length));
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
    }
}());
(function() {
    'use strict';

    angular
        .module('app.pages.slapWorld')
        .controller('SlapWorldController', SlapWorldController);

    /* @ngInject */
    function SlapWorldController($scope, $state, pageService, $window) {
        pageService
        .setPageTitle('SLAPworld');

        $scope.goToConnect = function() {
        	$window.open('https://connect.thankyousmallbusiness.com/');
        }

        $scope.goToConcierge = function() {
        	$('#agilecrm-button-chat').click();
        }

        $scope.goToBenefits = function() {
        	$state.go('slapBenefits')
        }

        $scope.goToChallenge = function() {
        	$state.go('slapChallenge');
        }
    }
}());
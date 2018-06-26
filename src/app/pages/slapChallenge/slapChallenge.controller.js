(function() {
    'use strict';

    angular
        .module('app.pages.slapWorld')
        .controller('SlapChallengeController', SlapChallengeController);

    /* @ngInject */
    function SlapChallengeController($scope, $state, pageService, $window) {
        pageService
        .setPageTitle('SLAPchallenge');

    }
}());
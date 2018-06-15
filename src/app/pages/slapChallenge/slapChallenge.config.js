(function () {
    'use strict';

    angular
        .module('app.pages.slapChallenge')
        .config(moduleConfig);

    function moduleConfig($stateProvider) {
        $stateProvider
            .state('slapChallenge', {
                data: {
                    access: '@'
                },
                parent: 'withNavbar',
                url: '/challenge',
                views: {
                    content: {
                        controller: 'SlapChallengeController',
                        templateUrl: 'pages/slapChallenge/slapChallenge.html'
                    }
                }
            })
    }
}());